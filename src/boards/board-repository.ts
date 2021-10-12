import { NotFoundException } from '@nestjs/common';
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

  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne(id);
    if (!found) {
      throw new NotFoundException(`해당 ID:${id}는 없는 게시글 입니다.`);
    }
    return found;
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`can't find Board with id ${id}`);
    }

    console.log('result : ', result);
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const Board = await this.getBoardById(id);

    Board.status = status;

    await this.save(Board);
    return Board;
  }
}
