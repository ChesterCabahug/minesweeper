document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".grid")
    let width = 10
    let bombAmount = 20
    let squares = []

    // create board
    createBoard = () => {
        // get shuffled game array with random bombs
        const bombArray = Array(bombAmount).fill("bomb")
        const emptyArray = Array(width*width - bombAmount).fill("valid")
        const gameArray = emptyArray.concat(bombArray)
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5)

        for (let i = 0; i < width * width; i++) {
            const square = document.createElement("div")
            square.setAttribute("id", i)
            square.classList.add(shuffledArray[i])


            grid.appendChild(square)
            squares.push(square)


            // normal click
            square.addEventListener("click" , e => {
                click(square)
            })
        }
    
    
        // add numbers
        for (let i = 0; i < squares.length; i++) {
            let total = 0
            const isLeftEdge = (i % width === 0)
            const isRightEdge = (i % width === width - 1)

            if (squares[i].classList.contains("valid")) {
                if (i > 0 && !isLeftEdge && squares[i - 1].classList.contains("bomb")) total++
                // squares to the southwest
                if (i > 9 && !isRightEdge && squares[i + 1 ].classList.contains("bomb")) total++
                // square to the north
                if (i > 10 && squares[i -width].classList.contains("bomb")) total++
                // square to the northwest
                if (i > 11 && isLeftEdge && squares[i - 1 -width].classList.contains("bomb")) total++
                // square to the east
                if (i < 98 && !isRightEdge && squares[i + 1].classList.contains("bomb")) total++
                // square to the southwest
                if (i < 90 && !isLeftEdge && squares[i - 1 +width].classList.contains("bomb")) total++
                // square to the southeast
                if (i < 88 && !isRightEdge && squares[i + 1 +width].classList.contains("bomb")) total++
                // square to the south
                if (i < 89 && squares[i + width].classList.contains("bomb")) total++
                squares[i].setAttribute("data", total)
                
                
            }
        }
    }

    createBoard()



    // click on square actions
    click = (square) => {
        if(square.classList.contains("bomb")) {
            console.log("Game over")
        } else {
            let total = square.getAttribute("data")
            if (total != 0) {
                square.classList.add("checked")
                square.innerHTML = total
                return
            }
        }
    }



})


