import { Controller, Get } from '@nestjs/common';

@Controller('testwork')
export class TestworkController {

  @Get()
  getExample(){
    return [{
      id:1,
      name:'Product 1'
    },
    {
      id: 2,
      name:'Product 2'
    }
  ];
  }
}
