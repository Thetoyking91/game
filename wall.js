class Wall {
    constructor(x1, y1, x2, y2, lineColor = color(0, 0, 0)) {
        this.a = createVector(x1, y1)
        this.b = createVector(x2, y2)
        this.lineColor = lineColor
    }

    show(weight = 10) {
        push()
        strokeWeight(weight)
        stroke(this.lineColor)
        line(this.a.x, this.a.y, this.b.x, this.b.y)
    }

    collide(pt, radius) {
        return collideLineCircleVector(this.a, this.b, pt, radius)
    }
}