import { CustomRes } from './interface'
import { Request } from 'express'
import { ArgumentMetadata, PipeTransform } from '@nestjs/common'

export async function wrapperService(
  waitService: () => Promise<any>,
  mustFields?: {
    data: object | number | string | undefined
    keyList?: Array<string>
  },
  customValid?: () => undefined | { res: boolean; msg: string }
): Promise<CustomRes> {
  try {
    if (mustFields) {
      // 通用校验
      if (mustFields.data === undefined) {
        return {
          code: -1,
          msg: `缺少参数`
        }
      }
      if (mustFields.keyList && typeof mustFields.data === 'object') {
        const loseKey = mustFields.keyList.find(
          (key) => mustFields.data[key] === undefined
        )
        if (loseKey) {
          return {
            code: -1,
            msg: `缺少参数 ${loseKey}`
          }
        }
      }
    }

    // 自定义校验
    const customValidRes = customValid ? customValid() : ''
    if (customValidRes && customValidRes.res === false)
      return {
        code: -1,
        msg: customValidRes.msg
      }

    const res = await waitService()
    return {
      code: 200,
      data: res
    }
  } catch (err) {
    const errMsg = err.toString()
    return {
      code: 0,
      msg: errMsg.includes('UNIQUE constraint')
        ? `数据已存在，新增失败!`
        : errMsg
    }
  }
}

export class FileSizeValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    const size = 1000
    if (value.size > size) return false
    return value
  }
}

export function getSysTime() {
  return new Date().toLocaleDateString().replaceAll('/', '-')
}

export const getRealIp = (req: Request): string => {
  const result =
    req.headers['x-forwarded-for'] ||
    req.headers['x-real-ip'] ||
    req.socket.remoteAddress ||
    req.ip
  return Array.isArray(result) ? result[0] : result
}
