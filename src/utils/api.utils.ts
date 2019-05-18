export let APIConfig = {
    url: "http://localhost:8080",
    buildUrl(path: string): string {
        return `${this.url}${path}`;
    }
}