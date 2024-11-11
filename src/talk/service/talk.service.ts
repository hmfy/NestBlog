import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {TalkEntity} from "../talk.entity";
import {DeleteResult, InsertResult, Repository, UpdateResult} from "typeorm";
import {DemoEntity} from "../../demo/demo.entity";
import {LinkEntity} from "../../link/link.entity";

@Injectable()
export class TalkService {
    constructor(
        @InjectRepository(TalkEntity)
        private talkRepository: Repository<TalkEntity>
    ) {
    }

    query(req): Promise<TalkEntity[]> {
        return this.talkRepository.find()
    }

    add(body): Promise<InsertResult> {
        return this.talkRepository.insert({
            content: body.content,
            nickname: body.nickname,
        })
    }

    del(id): Promise<DeleteResult> {
        return this.talkRepository.delete({
            id
        })
    }

    edit(body): Promise<UpdateResult> {
        return this.talkRepository.update({
            id: body.id
        }, body)
    }
}
