import { CustomRes } from './interface'
import { Request } from 'express'
import { ArgumentMetadata, PipeTransform } from '@nestjs/common'
import {
  FindOptionsWhere,
  InsertResult,
  ObjectLiteral,
  Repository
} from 'typeorm'

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
          msg: `缺少参数 ${mustFields.keyList?.[0] || ''}`
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
  private maxSize: number
  constructor(maxSize: number) {
    this.maxSize = maxSize
  }
  transform(value: any, metadata: ArgumentMetadata): any {
    if (!value) return false
    console.log(value.size)
    if (value.size > this.maxSize) return false
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

export function returnCur<T>(res: any, repository: Repository<T>): Promise<T> {
  const where = res.identifiers[0] as FindOptionsWhere<T>
  return repository.findOneBy(where)
}
