import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {DemoEntity} from "../demo.entity";
import {DeleteResult, InsertResult, Repository, UpdateResult} from "typeorm";
import {ArticleEntity} from "../../article/article.entity";

@Injectable()
export class DemoService {
    constructor(
        @InjectRepository(DemoEntity)
        private demoRepository: Repository<DemoEntity>
    ) {
    }

    query(req): Promise<DemoEntity[]> {
        return this.demoRepository.find()
    }

    add(body): Promise<InsertResult> {
        return this.demoRepository.insert({
            bg: body.bg,
            desc: body.desc,
        })
    }

    del(id): Promise<DeleteResult> {
        return this.demoRepository.delete({
            id
        })
    }

    edit(body): Promise<UpdateResult> {
        return this.demoRepository.update({
            id: body.id
        }, body)
    }
}
