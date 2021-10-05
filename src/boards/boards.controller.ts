import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './boards.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  getAllTasks(): Board[] {
    return this.boardsService.getAllBoards();
  }

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto): Board {
    // createBoard(@Body() body) {}
    // 혹은
    // createBoard(@Body('title') title:string , @Body('description) description:string ) {}
    // nestjs는 @Body로 가져옴, @Body('title) title 로 파라미터 주면 그것만 가져옴

    return this.boardsService.createBoard(
      createBoardDto
    );
  }
}
