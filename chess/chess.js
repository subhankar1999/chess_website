console.log('Welcome to chess game');
let turn ='white';
console.log(turn);
 let gameover = false;
let gametime = 10;
let time = gametime*60;
let time1 = time;
let time2 = time;
let tab = new Audio("tab.wav");
let check = new Audio("check.wav");


const changeTurn = ()=>{
    return turn === 'white' ? 'black':'white';
}

let time_1 = document.getElementById('time1');
let time_2 = document.getElementById('time2');

function updateCountDown() {
    let minutes;
    if(turn === 'white')
    {
        time2--;
        minutes = Math.floor(time2 / 60);
        seconds = time2 % 60;
        
    }
    else
    {
        time1--;
        minutes = Math.floor(time1 / 60);
        seconds = time1 % 60;
        
    }
    seconds = seconds < 10 ? '0'+seconds : seconds;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    if(turn === 'white')
    time_2.innerText = `${minutes} : ${seconds}`;
    else
    time_1.innerText = `${minutes} : ${seconds}`;
}

setInterval(updateCountDown, 1000);

class piece{
    constructor(name,color,canGo,canAttack,toRemove)
    {
        this.name = name;
        this.color = color;
        this.canGo = canGo;
        this.canAttack = canAttack;
        this.toRemove = toRemove;
    }
}

let whiteKing = '';
let blackKing = '';
let leftBlackRook = '';
let rightBlackRook = '';
let leftWhiteRook = '';
let rightWhiteRook = '';
let leftRookInterchange = 0;
let rightRookInterchange = 0;

let pieces = [];
// initialization
pieces[0] = new piece('rook','black','','','');
pieces[1] = new piece('knight','black','','','');
pieces[2] = new piece('bishop','black','','','');
pieces[3] = new piece('queen','black','','','');
pieces[4] = new piece('king','black','','','');
pieces[5] = new piece('bishop','black','','','');
pieces[6] = new piece('knight','black','','','');
pieces[7] = new piece('rook','black','','','');
for(i=8; i<=15; i++)
pieces[i] = new piece('pawn','black','','','');
for(i=16; i<=47; i++)
pieces[i] = new piece('','','','','');
for(i=48; i<=55; i++)
pieces[i] = new piece('pawn','white','','','');
pieces[56] = new piece('rook','white','','','');
pieces[57] = new piece('knight','white','','','');
pieces[58] = new piece('bishop','white','','','');
pieces[59] = new piece('queen','white','','','');
pieces[60] = new piece('king','white','','','');
pieces[61] = new piece('bishop','white','','','');
pieces[62] = new piece('knight','white','','','');
pieces[63] = new piece('rook','white','','','');

function refresh_board() {
    let boxes = document.getElementsByClassName('box');
    for(i=0; i<64; i++)
    {
        let row = parseInt(i/8);
        let col = i%8;
        if(pieces[i].canGo !== '')
        boxes[i].style.backgroundColor = 'rgb(254, 233, 188)';
        else if((row+col)%2 === 0)
        boxes[i].style.backgroundColor = 'rgb(197, 221, 241)';
        else
        boxes[i].style.backgroundColor = 'rgb(160, 193, 160)';
        

        if(pieces[i].color === 'black' && pieces[i].name ==='rook')
        boxes[i].style.backgroundImage = `url("black_rook.png")`;
        else if(pieces[i].color === 'black' && pieces[i].name ==='bishop')
        boxes[i].style.backgroundImage = `url("black_bishop.png")`;
        else if(pieces[i].color === 'black' && pieces[i].name ==='knight')
        boxes[i].style.backgroundImage = `url("black_knight.png")`;
        else if(pieces[i].color === 'black' && pieces[i].name ==='king')
        boxes[i].style.backgroundImage = `url("black_king.png")`;
        else if(pieces[i].color === 'black' && pieces[i].name ==='queen')
        boxes[i].style.backgroundImage = `url("black_queen.png")`;
        else if(pieces[i].color === 'black' && pieces[i].name ==='pawn')
        boxes[i].style.backgroundImage = `url("black_pawn.png")`;
        else if(pieces[i].color === 'white' && pieces[i].name ==='rook')
        boxes[i].style.backgroundImage = `url("white_rook.png")`;
        else if(pieces[i].color === 'white' && pieces[i].name ==='bishop')
        boxes[i].style.backgroundImage = `url("white_bishop.png")`;
        else if(pieces[i].color === 'white' && pieces[i].name ==='knight')
        boxes[i].style.backgroundImage = `url("white_knight.png")`;
        else if(pieces[i].color === 'white' && pieces[i].name ==='king')
        boxes[i].style.backgroundImage = `url("white_king.png")`;
        else if(pieces[i].color === 'white' && pieces[i].name ==='queen')
        boxes[i].style.backgroundImage = `url("white_queen.png")`;
        else if(pieces[i].color === 'white' && pieces[i].name ==='pawn')
        boxes[i].style.backgroundImage = `url("white_pawn.png")`;
        else if(pieces[i].color === '' && pieces[i].name === '')
        boxes[i].style.backgroundImage = 'none';
    }
  
}

refresh_board();

function updatechecking(pieces){
    let boxes = document.getElementsByClassName('box');
    for(i=0; i<64; i++)
    pieces[i].canAttack = '';
    for( i=0; i<64; i++)
    {
        let row = parseInt(i/8);
        let col = i%8;
        if(pieces[i].name === 'pawn')
        {
            let leftcorner ;
            if(pieces[i].color === 'black')
            leftcorner = (row+1)*8 + col -1;
            else
            leftcorner = (row-1)*8 + col -1;
            if(col > 0 )   
                pieces[leftcorner].canAttack += pieces[i].color;
            let rightcorner;
            if(pieces[i].color === 'black')
            rightcorner = (row+1)*8 + col + 1;
            else
            rightcorner = (row-1)*8 + col +1;
            if(col<7 )
                pieces[rightcorner].canAttack += pieces[i].color ;

        }
        else if(pieces[i].name === 'knight')
        {
            let xmove = [1,1,2,2,-1,-1,-2,-2];
            let ymove = [2,-2,1,-1,2,-2,1,-1];
            for(j=0; j<8; j++)
            {
                let togo = (row+xmove[j])*8 + col+ymove[j];
                if(row+xmove[j]>=0 && row+xmove[j]<8 && col+ymove[j]>=0 && col+ymove[j]<8 )
                {
                    pieces[togo].canAttack += pieces[i].color ;
                   
                }
                
            }

        }
        else if(pieces[i].name === 'bishop')
        {
             // moving to upper left
            let xmove = row - 1;
            let ymove = col - 1;
             let togo = xmove*8 + ymove;
             while(xmove>=0 && ymove>=0)
             {
                 pieces[togo].canAttack += pieces[i].color;
                 if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                 {}
                 else if(pieces[togo].color !== '')
                 break;
                 xmove--;
                 ymove--;
                 togo = xmove*8 + ymove;
             }
               // moving to upper right
            xmove = row-1;
            ymove = col+1;
            togo = xmove*8 + ymove;
            while(xmove>=0 && ymove<8 )
            {
                pieces[togo].canAttack += pieces[i].color ;
                if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                 {}
                else if(pieces[togo].color !== '')
                break;
                xmove--;
                ymove++;
                togo = xmove*8 + ymove;
            }
            //moving to bottom left
            xmove = row + 1;
            ymove = col - 1;
            togo = xmove*8 + ymove;
            while(xmove<8 && ymove>=0 )
            {
                pieces[togo].canAttack += pieces[i].color ;
                if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                 {}
                else if(pieces[togo].color !== '')
                break;
                xmove++;
                ymove--;
                togo = xmove*8 + ymove;
            }
            //moving bottom right
            xmove = row + 1;
            ymove = col + 1;
            togo = xmove*8 + ymove;
            while( xmove<8 && ymove<8 )
            {
                pieces[togo].canAttack += pieces[i].color ;
                if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                 {}
                else if(pieces[togo].color !== '')
                break;
                xmove++;
                ymove++;
                togo = xmove*8 + ymove;
            }
        }
        else if(pieces[i].name === 'rook')
        {
            //moving up
            let xmove = row - 1;
            let togo = xmove*8 + col;
            while(xmove>=0 )
            {
                pieces[togo].canAttack += pieces[i].color ;
                if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                 {}
                else if(pieces[togo].color !== '')
                break;
                xmove--;
                togo = xmove*8 + col;
            }
            //moving down
            xmove = row+1;
             togo = xmove*8 + col;
            while(xmove<8 )
            {
                pieces[togo].canAttack += pieces[i].color ;
                if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                 {}
                else if(pieces[togo].color !== '')
                break;
                xmove++;
                togo = xmove*8 + col;
            }
            //moving left
            let ymove = col -1;
            togo =  row*8 + ymove;
            while(ymove>=0 )
            {
                pieces[togo].canAttack += pieces[i].color;
                if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                 {}
                else if(pieces[togo].color !== '')
                break;
                ymove--;
                togo = row*8 + ymove;
            }
            // moving right

            ymove = col + 1;
            togo = row*8 + ymove;
            while(ymove<8 )
            {
                pieces[togo].canAttack += pieces[i].color ;
                if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                 {}
                else if(pieces[togo].color !== '')
                break;
                ymove++;
                togo = row*8 + ymove;
            }
        }
        else if(pieces[i].name === 'queen')
        {
            //moving up
            let xmove = row - 1;
            let togo = xmove*8 + col;
            while(xmove>=0 )
            {
                pieces[togo].canAttack += pieces[i].color ;
                if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                 {}
                else if(pieces[togo].color !== '')
                break;
                xmove--;
                togo = xmove*8 + col;
            }
            //moving down
            xmove = row+1;
             togo = xmove*8 + col;
            while(xmove<8 )
            {
                pieces[togo].canAttack += pieces[i].color ;
                if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                 {}
                else if(pieces[togo].color !== '')
                break;
                xmove++;
                togo = xmove*8 + col;
            }
            //moving left
            let ymove = col -1;
            togo =  row*8 + ymove;
            while(ymove>=0 )
            {
                pieces[togo].canAttack += pieces[i].color ;
                if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                 {}
                else if(pieces[togo].color !== '')
                break;
                ymove--;
                togo = row*8 + ymove;
            }
            // moving right

            ymove = col + 1;
            togo = row*8 + ymove;
            while(ymove<8 )
            {
                pieces[togo].canAttack += pieces[i].color ;
                if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                 {}
                else if(pieces[togo].color !== '')
                break;
                ymove++;
                togo = row*8 + ymove;
            }

              // moving to upper left
              xmove = row - 1;
              ymove = col - 1;
               togo = xmove*8 + ymove;
              while(xmove>=0 && ymove>=0)
              {
                  pieces[togo].canAttack += pieces[i].color ;
                  if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                 {}
                  else if(pieces[togo].color !== '')
                  break;
                  xmove--;
                  ymove--;
                  togo = xmove*8 + ymove;
              }
              // moving to upper right
              xmove = row-1;
              ymove = col+1;
              togo = xmove*8 + ymove;
              while(xmove>=0 && ymove<8 )
              {
                  pieces[togo].canAttack += pieces[i].color;
                  if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                    {}
                  else if(pieces[togo].color !== '')
                  break;
                  xmove--;
                  ymove++;
                  togo = xmove*8 + ymove;
              }
              //moving to bottom left
              xmove = row + 1;
              ymove = col - 1;
              togo = xmove*8 + ymove;
              while( xmove<8 && ymove>=0 )
              {
                  pieces[togo].canAttack += pieces[i].color ;
                  if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                    {}
                  else if(pieces[togo].color !== '')
                  break;
                  xmove++;
                  ymove--;
                  togo = xmove*8 + ymove;
              }
              //moving bottom right
              xmove = row + 1;
              ymove = col + 1;
              togo = xmove*8 + ymove;
              while( xmove<8 && ymove<8 )
              {
                  pieces[togo].canAttack += pieces[i].color;
                  if(pieces[togo].name === 'king' && pieces[togo].color !== pieces[i].color)
                    {}
                  else if(pieces[togo].color !== '')
                  break;
                  xmove++;
                  ymove++;
                  togo = xmove*8 + ymove;
              }
        }
        else if(pieces[i].name === 'king')
        {
            let xmove = [-1,-1,-1,0,1,1,1,0];
            let ymove = [-1,0,1,1,1,0,-1,-1];
            for(j=0; j<8; j++)
            {
                if(row+xmove[j]>=0 && row+xmove[j]<8 && col+ymove[j]>=0 && col+ymove[j]<8)
                {
                    let togo = (row+xmove[j])*8 + col+ymove[j];
                    pieces[togo].canAttack += pieces[i].color;
                }
            }
        }
    }
}

const isKingsInCheck = () =>{
    let boxes = document.getElementsByClassName('box');
    for(i=0; i<64; i++)
    {
        if(pieces[i].name === 'king' )
        {
            let oppositecolor;
            if(pieces[i].color === 'black')
            oppositecolor = 'white';
            else
            oppositecolor = 'black';
            if(pieces[i].canAttack.includes(oppositecolor))
            {
                boxes[i].style.backgroundColor = 'rgb(220, 97, 56)';
                return true;
            }
        }
    }
    return false;
}

function ispossible(prev, next)
{
    let dummy = [];
    for(i=0; i<64; i++)
    dummy[i] = new piece(pieces[i].name,pieces[i].color, pieces[i].canGo, pieces[i].canAttack, pieces[i].toRemove);
    dummy[next].name = dummy[prev].name;
    dummy[next].color = dummy[prev].color;
    dummy[prev].name = '';
    dummy[prev].color = '';
    updatechecking(dummy);
    for(i=0; i<64; i++)
    {
        if(dummy[i].name === 'king' && dummy[i].color === dummy[next].color)
        {
            let oppositecolor;
            if(dummy[i].color === 'black')
            oppositecolor = 'white';
            else
            oppositecolor = 'black';
            if(dummy[i].canAttack.includes(oppositecolor))
            {
                return false;
            }
        }
    }
    return true;

}


let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click',()=>{
        let id = boxtext.id;
        let val = id.substring(3);      // selected box
        let row = parseInt(val/8);
        let col = val%8;
       if(pieces[val].canGo !== '')
       {
           let name = pieces[val].canGo.substring(5);
           let color = pieces[val].canGo.substring(0,5);
           for(i=0; i<64; i++)
           if(pieces[i].canGo !== '')
           pieces[i].canGo = '';
           pieces[val].color = color;
           if(row === 7 && color === 'black' && name === 'pawn')
           pieces[val].name = 'queen';
           else if(row === 0 && color === 'white' && name === 'pawn')
           pieces[val].name = 'queen';
           else 
           pieces[val].name = name;
           if(pieces[val].name === 'king' && parseInt(val) === leftRookInterchange)
           {
               console.log('left interchange ..');
               if(pieces[val].color === 'white')
               {
                   pieces[56].name = '';
                   pieces[56].color = '';
                   pieces[parseInt(val)+1].name = 'rook';
                   pieces[parseInt(val)+1].color = 'white';
                   leftWhiteRook = 'moved';
               }
               if(pieces[val].color === 'black')
               {
                   pieces[0].name = '';
                   pieces[0].color = '';
                   pieces[parseInt(val)+1].name = 'rook';
                   pieces[parseInt(val)+1].color = 'black';
                   leftBlackRook = 'moved';
               }
               leftRookInterchange = 0;
               rightRookInterchange = 0;
           }
           else if(pieces[val].name === 'king' && parseInt(val) === rightRookInterchange)
           {
            console.log('right interchange ..');
                if(pieces[val].color === 'white')
                {
                    pieces[63].name = '';
                    pieces[63].color = '';
                    pieces[val-1].name = 'rook';
                    pieces[val-1].color = 'white';
                    rightWhiteRook = 'moved';
                }
                if(pieces[val].color === 'black')
               {
                   pieces[7].name = '';
                   pieces[7].color = '';
                   pieces[val-1].name = 'rook';
                   pieces[val-1].color = 'black';
                   rightBlackRook = 'moved';
               }
               leftRookInterchange = 0;
               rightRookInterchange = 0;
           }
           for(i = 0; i< 64; i++)
           {
               if(pieces[i].toRemove === 'remove')
               {
                   if(pieces[i].name === 'rook' && pieces[i].color === 'black' && i===0)
                   leftBlackRook = 'moved';
                   else if(pieces[i].name === 'rook' && pieces[i].color === 'black' && i===7)
                   rightBlackRook = 'moved';
                   else if(pieces[i].name === 'rook' && pieces[i].color === 'white' && i===56)
                   leftWhiteRook = 'moved';
                   else if(pieces[i].name === 'rook' && pieces[i].color === 'black' && i===63)
                    rightWhiteRook = 'moved';
                    else if(pieces[i].name === 'king' && pieces[i].color === 'black' )
                    blackKing = 'moved';
                    else if(pieces[i].name === 'king' && pieces[i].color === 'white' )
                    whiteKing = 'moved';
                    pieces[i].name = '';
                    pieces[i].color = '';
                    pieces[i].toRemove = '';
               }
           }
           turn = changeTurn();
           
           refresh_board();
        updatechecking(pieces);
            if(isKingsInCheck())
            check.play();
            else
            tab.play();
       }
        else if(pieces[val].name === 'pawn' && pieces[val].color === turn)
        {
            // move of pawn
            for(i=0; i<64; i++)
            {
                pieces[i].toRemove = '';
                 pieces[i].canGo = '';
            }
            let pos;
            if(pieces[val].color === 'black')
            pos = (row+1)*8 + col;
            else
            pos = (row-1)*8 + col;
            flag = 0;
            if(pieces[pos].name === '' )
            {
                if(ispossible(val,pos))
                pieces[pos].canGo = pieces[val].color+pieces[val].name; 
                flag = 1; 
            }

            // for first move only
            if( flag===1 && (row==1 && pieces[val].color==='black') || (row===6 && pieces[val].color==='white'))  
            {
                if(pieces[val].color === 'black')
                pos = (row+2)*8 + col;
                else
                pos = (row-2)*8 + col;
                if(pieces[pos].name === '' && ispossible(val,pos))
                {
                    pieces[pos].canGo = pieces[val].color+pieces[val].name;    
                }
            }

            // for kill the opponent
            let leftcorner ;
            if(pieces[val].color === 'black')
            leftcorner = (row+1)*8 + col -1;
            else
            leftcorner = (row-1)*8 + col -1;
            if(col > 0 && pieces[leftcorner].name !=='' && pieces[leftcorner].color !== pieces[val].color && ispossible(val,leftcorner))   
                pieces[leftcorner].canGo = pieces[val].color+pieces[val].name;
            

            let rightcorner;
            if(pieces[val].color === 'black')
            rightcorner = (row+1)*8 + col + 1;
            else
            rightcorner = (row-1)*8 + col +1;
            if(col<7 && pieces[rightcorner].name !=='' && pieces[rightcorner].color !== pieces[val].color && ispossible(val,rightcorner))
                pieces[rightcorner].canGo = pieces[val].color + pieces[val].name;

                pieces[val].toRemove = 'remove';
        }
        else if(pieces[val].name === 'knight' && pieces[val].color === turn)
        {
            // knight moves
            for(i=0; i<64; i++)
            {
                pieces[i].toRemove = '';
                 pieces[i].canGo = '';
            }
            let xmove = [1,1,2,2,-1,-1,-2,-2];
            let ymove = [2,-2,1,-1,2,-2,1,-1];
            for(y=0; y<8; y++)
            {
                console.log(`${row+xmove[y]} -- ${col+ymove[y]}`);
                let togo = (row+xmove[y])*8 + col+ymove[y];
                console.log(y);
                console.log(togo);
                if(row+xmove[y]>=0 && row+xmove[y]<8 && col+ymove[y]>=0 && col+ymove[y]<8 && pieces[val].color!==pieces[togo].color && ispossible(val,togo))
                {
                    pieces[togo].canGo = pieces[val].color + pieces[val].name;
                   
                }
                
            }
            pieces[val].toRemove = 'remove';
        }
        else if(pieces[val].name === 'bishop' && pieces[val].color === turn)
        {
            // bishop moves
            for(i=0; i<64; i++)
            {
                pieces[i].toRemove = '';
                 pieces[i].canGo = '';
            }

            // moving to upper left
            xmove = row - 1;
            ymove = col - 1;
            let togo = xmove*8 + ymove;
            while(xmove>=0 && ymove>=0 && pieces[val].color !== pieces[togo].color )
            {
                if(ispossible(val,togo))
                pieces[togo].canGo = pieces[val].color + pieces[val].name;
                if(pieces[togo].color !== '')
                break;
                xmove--;
                ymove--;
                togo = xmove*8 + ymove;
            }
            // moving to upper right
            xmove = row-1;
            ymove = col+1;
            togo = xmove*8 + ymove;
            while(xmove>=0 && ymove<8 && pieces[val].color !== pieces[togo].color )
            {
                if(ispossible(val,togo))
                pieces[togo].canGo = pieces[val].color + pieces[val].name;
                if(pieces[togo].color !== '')
                break;
                xmove--;
                ymove++;
                togo = xmove*8 + ymove;
            }
            //moving to bottom left
            xmove = row + 1;
            ymove = col - 1;
            togo = xmove*8 + ymove;
            while(xmove<8 && ymove>=0 && pieces[val].color !== pieces[togo].color )
            {
                if(ispossible(val,togo))
                pieces[togo].canGo = pieces[val].color + pieces[val].name;
                if(pieces[togo].color !== '')
                break;
                xmove++;
                ymove--;
                togo = xmove*8 + ymove;
            }
            //moving bottom right
            xmove = row + 1;
            ymove = col + 1;
            togo = xmove*8 + ymove;
            while( xmove<8 && ymove<8 && pieces[val].color !== pieces[togo].color )
            {
                if(ispossible(val,togo))
                pieces[togo].canGo = pieces[val].color + pieces[val].name;
                if(pieces[togo].color !== '')
                break;
                xmove++;
                ymove++;
                togo = xmove*8 + ymove;
            }
            pieces[val].toRemove = 'remove';
        }
        else if(pieces[val].name === 'rook' && pieces[val].color === turn)
        {
            // moves of rook
            for(i=0; i<64; i++)
            {
                pieces[i].toRemove = '';
                 pieces[i].canGo = '';
            }
            //moving up
            let xmove = row - 1;
            let togo = xmove*8 + col;
            while(xmove>=0 && pieces[val].color!==pieces[togo].color )
            {
                if(ispossible(val,togo))
                pieces[togo].canGo = pieces[val].color + pieces[val].name;
                if(pieces[togo].color !== '')
                break;
                xmove--;
                togo = xmove*8 + col;
            }
            //moving down
            xmove = row+1;
             togo = xmove*8 + col;
            while(xmove<8 && pieces[val].color!==pieces[togo].color )
            {
                if(ispossible(val,togo))
                pieces[togo].canGo = pieces[val].color + pieces[val].name;
                if(pieces[togo].color !== '')
                break;
                xmove++;
                togo = xmove*8 + col;
            }
            //moving left
            let ymove = col -1;
            togo =  row*8 + ymove;
            while(ymove>=0 && pieces[val].color!==pieces[togo].color )
            {
                if(ispossible(val,togo))
                pieces[togo].canGo = pieces[val].color + pieces[val].name;
                if(pieces[togo].color !== '')
                break;
                ymove--;
                togo = row*8 + ymove;
            }
            // moving right

            ymove = col + 1;
            togo = row*8 + ymove;
            while(ymove<8 && pieces[val].color!==pieces[togo].color )
            {
                if(ispossible(val,togo))
                pieces[togo].canGo = pieces[val].color + pieces[val].name;
                if(pieces[togo].color !== '')
                break;
                ymove++;
                togo = row*8 + ymove;
            }
            pieces[val].toRemove = 'remove';
        }
        else if(pieces[val].name === 'queen' && pieces[val].color === turn)
        {

            // moves of queen
            for(i=0; i<64; i++)
            {
                pieces[i].toRemove = '';
                 pieces[i].canGo = '';
            }

            //moving up
            let xmove = row - 1;
            let togo = xmove*8 + col;
            while(xmove>=0 && pieces[val].color!==pieces[togo].color )
            {
                if(ispossible(val,togo))
                pieces[togo].canGo = pieces[val].color + pieces[val].name;
                if(pieces[togo].color !== '')
                break;
                xmove--;
                togo = xmove*8 + col;
            }
            //moving down
            xmove = row+1;
             togo = xmove*8 + col;
            while(xmove<8 && pieces[val].color!==pieces[togo].color )
            {
                if(ispossible(val,togo))
                pieces[togo].canGo = pieces[val].color + pieces[val].name;
                if(pieces[togo].color !== '')
                break;
                xmove++;
                togo = xmove*8 + col;
            }
            //moving left
            let ymove = col -1;
            togo =  row*8 + ymove;
            while(ymove>=0 && pieces[val].color!==pieces[togo].color )
            {
                if(ispossible(val,togo))
                pieces[togo].canGo = pieces[val].color + pieces[val].name;
                if(pieces[togo].color !== '')
                break;
                ymove--;
                togo = row*8 + ymove;
            }
            // moving right

            ymove = col + 1;
            togo = row*8 + ymove;
            while(ymove<8 && pieces[val].color!==pieces[togo].color )
            {
                if(ispossible(val,togo))
                pieces[togo].canGo = pieces[val].color + pieces[val].name;
                if(pieces[togo].color !== '')
                break;
                ymove++;
                togo = row*8 + ymove;
            }

              // moving to upper left
              xmove = row - 1;
              ymove = col - 1;
               togo = xmove*8 + ymove;
              while(xmove>=0 && ymove>=0 && pieces[val].color !== pieces[togo].color )
              {
                    if(ispossible(val,togo))
                  pieces[togo].canGo = pieces[val].color + pieces[val].name;
                  if(pieces[togo].color !== '')
                  break;
                  xmove--;
                  ymove--;
                  togo = xmove*8 + ymove;
              }
              // moving to upper right
              xmove = row-1;
              ymove = col+1;
              togo = xmove*8 + ymove;
              while(xmove>=0 && ymove<8 && pieces[val].color !== pieces[togo].color )
              {
                    if(ispossible(val,togo))
                  pieces[togo].canGo = pieces[val].color + pieces[val].name;
                  if(pieces[togo].color !== '')
                  break;
                  xmove--;
                  ymove++;
                  togo = xmove*8 + ymove;
              }
              //moving to bottom left
              xmove = row + 1;
              ymove = col - 1;
              togo = xmove*8 + ymove;
              while( xmove<8 && ymove>=0 && pieces[val].color !== pieces[togo].color )
              {
                if(ispossible(val,togo))
                  pieces[togo].canGo = pieces[val].color + pieces[val].name;
                  if(pieces[togo].color !== '')
                  break;
                  xmove++;
                  ymove--;
                  togo = xmove*8 + ymove;
              }
              //moving bottom right
              xmove = row + 1;
              ymove = col + 1;
              togo = xmove*8 + ymove;
              while( xmove<8 && ymove<8 && pieces[val].color !== pieces[togo].color )
              {
                if(ispossible(val,togo))
                  pieces[togo].canGo = pieces[val].color + pieces[val].name;
                  if(pieces[togo].color !== '')
                  break;
                  xmove++;
                  ymove++;
                  togo = xmove*8 + ymove;
              }
              pieces[val].toRemove = 'remove';
        }
        else if(pieces[val].name === 'king' && pieces[val].color === turn)
        {
            for(i=0; i<64; i++)
            {
                pieces[i].toRemove = '';
                 pieces[i].canGo = '';
            }
            
            let xmove = [-1,-1,-1,0,1,1,1,0];
            let ymove = [-1,0,1,1,1,0,-1,-1];
            for(j=0; j<8; j++)
            {
                let togo = (row+xmove[j])*8 + col+ymove[j];
                if(row+xmove[j]>=0 && row+xmove[j]<8 && col+ymove[j]>=0 && col+ymove[j]<8 && pieces[togo].color !== pieces[val].color )
                {
                    let oppositecolor;
                    if(pieces[val].color === 'black')
                        oppositecolor = 'white';
                        else
                        oppositecolor = 'black';
                    if(!pieces[togo].canAttack.includes(oppositecolor))
                    pieces[togo].canGo = pieces[val].color + pieces[val].name;
                }
            }
            //special move 
            if(pieces[val].color === 'black' && blackKing !== 'moved' && !pieces[val].canAttack.includes('white'))
            {
                if(leftBlackRook !== 'moved' && pieces[0].name === 'rook' && pieces[0].color === 'black')
                {
                    if(!pieces[val-2].canAttack.includes('white') && !pieces[val-1].canAttack.includes('white') && pieces[val-1].color==='' && pieces[val-2].color==='' && pieces[val-3].color==='')
                    {
                        pieces[val-2].canGo = pieces[val].color + pieces[val].name;
                        leftRookInterchange = val-2;
                    }

                }
                if(rightBlackRook !== 'moved' && pieces[7].name === 'rook' && pieces[7].color === 'black')
                {
                    let a = parseInt(val);
                    if(!pieces[a+2].canAttack.includes('white') && !pieces[a+1].canAttack.includes('white') && pieces[a+1].color==='' && pieces[a+2].color==='')
                    {
                        pieces[a+2].canGo = pieces[a].color + pieces[a].name;
                        rightRookInterchange = a+2;
                    }
                }
            }
            else if(pieces[val].color === 'white' && whiteKing !== 'moved' && !pieces[val].canAttack.includes('black'))
            {
                if(leftWhiteRook !== 'moved' && pieces[56].name === 'rook' && pieces[56].color === 'white')
                {
                    if(!pieces[val-2].canAttack.includes('black') && !pieces[val-1].canAttack.includes('black') && pieces[val-1].color==='' && pieces[val-2].color==='' && pieces[val-3].color==='')
                    {
                        pieces[val-2].canGo = pieces[val].color + pieces[val].name;
                        leftRookInterchange = val-2;
                    }
                }
                if(rightWhiteRook !== 'moved' && pieces[63].name === 'rook' && pieces[63].color === 'white')
                {
                    let a = parseInt(val);
                    if(!pieces[a+2].canAttack.includes('black') && !pieces[a+1].canAttack.includes('black') && pieces[a+1].color==='' && pieces[a+2].color==='')
                    {
                        pieces[a+2].canGo = pieces[val].color + pieces[val].name;
                        rightRookInterchange = a+2;
                    }
                }
            }

            pieces[val].toRemove = 'remove';
        }
        else
        {
            for(i=0; i<64; i++)
            {
                pieces[i].toRemove = '';
                 pieces[i].canGo = '';
            }
        }
        refresh_board();
        updatechecking(pieces);
        isKingsInCheck();
    })
})
