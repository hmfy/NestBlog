import {CustomRes} from "./interface";

export async function wrapperService (
    waitService: () => Promise<any>,
    mustFields?: {
        data: object | number | string | undefined,
        keyList: Array<string>
    },
    customValid?: () => undefined | {res: boolean, msg: string}
): Promise<CustomRes> {
    try {
        // 通用校验
        if (typeof mustFields.data === 'object') {
            const loseKey = mustFields.keyList.find(key => mustFields.data[key] === undefined)
            return {
                code: -1,
                msg: `缺少参数 ${loseKey}`
            }
        } else {
            // number string
            if (mustFields.data === undefined) return {
                code: -1,
                msg: `缺少参数 ${mustFields.keyList[0]}`
            }
        }

        // 自定义校验
        const customValidRes = customValid ? customValid() : ''
        if (customValidRes && customValidRes.res === false) return {
            code: -1,
            msg: customValidRes.msg,
        }

        const res = await waitService()
        return {
            code: 200,
            data: res
        }
    } catch (err) {
        return {
            code: 0,
            msg: err,
        }
    }
}
