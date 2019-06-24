import {AnySSZType, deserialize, parseType, serialize} from "@chainsafe/ssz";
import {expandInput, unexpandInput} from "./translate";
import {dumpYaml, parseYaml} from "./yaml";

type InputTypeRecord = Record<string, InputType>

type InputType = {
    parse: (raw: string, type: AnySSZType) => any,
    dump: (value: any, type: AnySSZType) => string,
}

export const inputTypes: InputTypeRecord = {
    yaml: {
        parse: (raw, type) => expandInput(parseYaml(raw), parseType(type), false),
        dump: (value, type) => dumpYaml(unexpandInput(value, parseType(type), false)),
    },
    json: {
        parse: (raw, type) => expandInput(JSON.parse(raw), parseType(type), true),
        dump: (value, type) => JSON.stringify(unexpandInput(value, parseType(type), true)),
    },
    ssz: {
        parse: (raw, type) => {
          let buf: Buffer;
          if (raw.slice(0, 2) === '0x') {
            buf = Buffer.from(raw.replace('0x', ''), 'hex')
          } else {
            buf = Buffer.from(raw, 'base64')
          }
          return deserialize(buf, type)
        },
        dump: (value, type) => '0x' + serialize(expandInput(value, parseType(type), false), type).toString('hex'),
    },
};