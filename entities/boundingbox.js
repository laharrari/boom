function BoundingBox(theX, theY, theWidth, theHeight) {
    this.x = theX;
    this.y = theY;
    this.width = theWidth;
    this.height = theHeight;
    this.left = theX;
    this.top = theY;
    this.right = this.left + theWidth;
    this.bottom = this.top + theHeight;
}

BoundingBox.prototype.collide = function (oth) {
    if (this.right > oth.left && this.left < oth.right && this.top < oth.bottom && this.bottom > oth.top)
    return true;
    return false;
}