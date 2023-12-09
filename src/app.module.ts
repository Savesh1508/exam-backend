import { RolesModule } from './roles/roles.module';
import { Role } from './roles/model/role.model';
import { Module } from '@nestjs/common';
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/model/user.model';
import { UserRoles } from './roles/model/user-roles.model';
import { SharedModule } from './shared/shared.module';
import { AuthorModule } from './author/author.module';
import { Author } from './author/model/author.model';
import { BookModule } from './book/book.module';
import { Book } from './book/model/book.model';
import { CategoryModule } from './category/category.module';
import { Category } from './category/model/category.model';


@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
    SequelizeModule.forRoot({
      dialect:"postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Author,
        Role,
        Book,
        Category,
        UserRoles,
      ],
      autoLoadModels: true,
      logging: true
    }),
    UserModule,
    RolesModule,
    SharedModule,
    AuthorModule,
    BookModule,
    CategoryModule
  ],
  controllers: [],
  providers: [AppService],
  exports: []
})
export class AppModule {}
