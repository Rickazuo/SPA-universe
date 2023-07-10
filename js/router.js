export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()

        window.history.pushState({}, "", event.currentTarget.href)

        this.handle()
    }

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname] || this.routes['404']
        fetch(route)
        .then(data => data.text())
        .then(html => {
            document.querySelector('#app').innerHTML = html
            this.updateBackground(pathname)
        })
        
    }

    updateBackground(route) {
        const body = document.querySelector("body")
        const home = document.getElementById("nav-home")
        const universe = document.getElementById("nav-universe")
        const exploration = document.getElementById("nav-exploration")

        switch (route) {
            case "/":
                body.style.backgroundImage = "url(../assets/mountains-universe-1.png)";
                home.style.color = "var(--white)"
                break;
            case "/universe":
                body.style.backgroundImage = "url(../assets/mountains-universe-2.png)";
                universe.style.color = "var(--white)"
                break;
            case "/exploration":
                body.style.backgroundImage = "url(../assets/mountains-universe-3.png)";
                exploration.style.color = "var(--white)"
                break;
            default:
                break;
        }
    }
}
