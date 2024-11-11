import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {LinkEntity} from "../link.entity";
import {DeleteResult, InsertResult, Repository, UpdateResult} from "typeorm";
import {DemoEntity} from "../../demo/demo.entity";

@Injectable()
export class LinkService {
    constructor(
        @InjectRepository(LinkEntity)
        private linkRepository: Repository<LinkEntity>
    ) {
    }

    query(req): Promise<LinkEntity[]> {
        return this.linkRepository.find()
    }

    add(body): Promise<InsertResult> {
        return this.linkRepository.insert({
            bg: body.bg,
            desc: body.desc,
        })
    }

    del(id): Promise<DeleteResult> {
        return this.linkRepository.delete({
            id
        })
    }

    edit(body): Promise<UpdateResult> {
        return this.linkRepository.update({
            id: body.id
        }, body)
    }
}
