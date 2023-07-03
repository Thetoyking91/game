let saveButton
let character
let thatoneguy
let bg
let gameInfo
let socket
let otherPlayers = []
let speed = 200
let uuid

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function setup() {
    socket = io()
    createCanvas(1820, 720)
    // saveButton = createButton("Save")
    // saveButton.mousePressed(save)
    let cookies = document.cookie.split("; ")
    // console.log(cookies)
    for (let cookie in cookies) {
        cookie = cookies[cookie]
        let kv = cookie.split("=")
        console.log(kv)
        if (kv[0] == "uuid") {
            console.log(kv[1])
            uuid = kv[1]
        }
    }
    if (!uuid) {
        uuid = create_UUID()
        document.cookie = "uuid=" + uuid
        
    }
    bg = loadImage("./assets/moon.jpg")
    character = loadImage("./assets/character.png")
    thatoneguy = loadImage("./assets/thatoneguy.png")
    textAlign(CENTER)
    otherPlayers = []
    // console.log(gameInfo)
    socket.on('connect', () => {
        console.log("connect")
        // gameInfo.id = socket.id
       console.log(gameInfo)
    })
    socket.on('multiplayerPos', (data) => {
        console.log(otherPlayers.toString())
        console.log(typeof(otherPlayers))
        console.log(data)
        const i = otherPlayers.findIndex(e => e.id === data.id)
        console.log(i)
        if (i > -1){
            otherPlayers[i] = data
        } else {
            otherPlayers.push(data)
        }
    })
    socket.on('die', (id) => {
        const i = otherPlayers.findIndex(e => e.id === id)
        const firstHalf = otherPlayers.splice(0, i)
        const secondHalf = otherPlayers.splice(i)
        otherPlayers = firstHalf.concat(secondHalf)
        console.log(typeof(otherPlayers))
    })
   gameInfo = {x: width/2, y: height/2, id: uuid}

}

function draw() {
    background(bg)
    // console.log(deltaTime/1000)
    image(character, gameInfo.x - character.width/16, gameInfo.y - character.height/16, character.width/8, character.height/8)
    for (player in otherPlayers) {
        image(thatoneguy, otherPlayers[player].x - thatoneguy.width/16, otherPlayers[player].y - thatoneguy.height/16, thatoneguy.width/8, thatoneguy.height/8)
        // console.log(otherPlayers)
        // console.log(player)
    }
    // console.log(thatoneguy.height)
    // console.log(thatoneguy.width)
    fill(0)
    text(keyCode.key, width/2, height/2)
    // console.log(key)
    if (keyIsPressed === true) {
        // console.log(gameInfo)
        if (key == "w" || keyCode == UP_ARROW) {
            gameInfo.y -= speed * deltaTime/1000
        }
        if (key == "s" || keyCode == DOWN_ARROW) {
            gameInfo.y += speed * deltaTime/1000
        }
        if (key == "a" || keyCode == LEFT_ARROW) {
            gameInfo.x -= speed * deltaTime/1000
        }
        if (key == "d" || keyCode == RIGHT_ARROW) {
            gameInfo.x += speed * deltaTime/1000
        }
        socket.emit('multiplayerPos', gameInfo)
    }

    if (gameInfo.x > width) {
        gameInfo.x = 0
    } else if (gameInfo.x < 0) {
        gameInfo.x = width
    } else if (gameInfo.y < 0) {
        gameInfo.y = height
    } else if (gameInfo.y > height) {
        gameInfo.y = 0
    }


}

function keyPressed(keyCode) {
    console.log(keyCode.key)
    if (keyCode.key == "S") {
        console.log("Saving?")
    }

    
}