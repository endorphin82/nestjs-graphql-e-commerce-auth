import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return "<a href='http://localhost:3000/graphql' >gql payload</a>";
  }
}
