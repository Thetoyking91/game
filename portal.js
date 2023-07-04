class Portal extends Wall {
    constructor(x1, y1, x2, y2, facing, lineColor = color(0, 0, 0)) {
        super(x1, y1, x2, y2, lineColor)
        this.dir = facing
    }

    link(portal) {
        this.target = portal
        portal.target = this
        this.linked = true
        portal.linked = true
    }

    get midpoint() {
        return createVector((this.a.x + this.b.x)/2, (this.a.y + this.b.y)/2)
    }

    check(pt, radius) {
        if (this.collide(pt, radius)) {
            return true
        }
    }
    teleport(pt, radius, gameInfo) {
        if (collideLineCircleVector(this.a, this.b, pt, radius)) {
            gameInfo.x = this.target.midpoint.x + (this.target.dir.x * radius*2 + 20) 
            gameInfo.y = this.target.midpoint.y + (this.target.dir.y * radius*2 + 20) 
        }
        return gameInfo
    }

}