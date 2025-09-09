export default async function (delayInMs: number): Promise<number> {
    return new Promise(function (resolve) {
        const timeAtStartInMs: number = Date.now();
        setTimeout(() => {
            resolve(Date.now() - timeAtStartInMs);
        }, delayInMs);
    });
}
