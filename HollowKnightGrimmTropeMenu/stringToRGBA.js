function stringRGBToRGB(input){
    const r = parseInt(input.slice(1, 3), 16);
    const g = parseInt(input.slice(3, 5), 16);
    const b = parseInt(input.slice(5, 7), 16);

    return { r, g, b };
}