// Le differenze tra `type` e `interface`:
//  * il tipo è 'fisso', non modificabile, mentre l'interfaccia è 'componibile'
var BirdClass = /** @class */ (function () {
    function BirdClass() {
    }
    BirdClass.prototype.Fly = function () {
        throw new Error("Method not implemented.");
    };
    return BirdClass;
}());
var pelican = {
    name: 'pelican',
    Fly: function () {
        console.log(this.name + ': I\'m flying');
    }
};
pelican.Fly();
console.log("typeof(pelican): " + typeof (pelican));
console.log("pelican instanceof BirdClass: " + (pelican instanceof BirdClass));
console.log("typeof (new BirdClass()): " + typeof (new BirdClass()));
console.log("(new BirdClass()) instanceof BirdClass}: " + ((new BirdClass()) instanceof BirdClass));
function move(bird) {
    console.log('moving bird:');
    bird.Fly();
}
move(pelican);
//# sourceMappingURL=ts-example.js.map