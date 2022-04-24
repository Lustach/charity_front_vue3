function fixCrlf(e: string): string {
    if (!Array.isArray(e)) {
        e = e.replace(/(\r\n|\n|\r)/g, "\r\n");
    }
    return e;
}
function fixEnterChar(e: string): string {
    if (!Array.isArray(e)) {
        e = e.replace(/(\r\n|\n|\r)/g, "");
    }
    return e;
}

export default {
    fixCrlf,
    fixEnterChar
}