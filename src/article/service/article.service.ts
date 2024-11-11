import {Body, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ArticleEntity} from "../article.entity";
import {DeleteResult, InsertResult, Repository, UpdateResult} from "typeorm";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private articleRepository: Repository<ArticleEntity>,
    ) {

    }

    getArticle(req): Promise<ArticleEntity[]> {
        return this.articleRepository.find()
    }

    addArticle(body): Promise<InsertResult> {
        return this.articleRepository.insert({
            title: body.title,
            content: body.content,
            tag: body.tag,
        })
    }

    delArticle(id): Promise<DeleteResult> {
        return this.articleRepository.delete({
            id
        })
    }

    editArticle(body): Promise<UpdateResult> {
        return this.articleRepository.update({
            id: body.id
        }, body)
    }
}
