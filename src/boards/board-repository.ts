import { EntityRepository, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board) //ㅇㅣ 클래스가 Board엔티티를 컨트롤함을 알려줌
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;

    const Board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.save(Board);
    return Board;
  }
}
