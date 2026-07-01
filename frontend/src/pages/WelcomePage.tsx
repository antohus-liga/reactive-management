import {Link} from "react-router-dom";

export default function WelcomePage() {
    return (
        <div
            className="bg-gray-900 h-full flex flex-col items-center justify-center text-center gap-6 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)]">
            {/* Title */}
            <div className={"text-white p-4 flex flex-col items-center justify-center font-mono"}>
                <div className="rounded-full relative w-100 h-100 flex items-center justify-center">
                    <img
                        src="/favicon.png"
                        alt="logo"
                        className="absolute inset-0 w-full h-full object-contain opacity-20"
                    />
                    <h1 className="relative text-8xl font-bold">
                        Reactive Management
                    </h1>
                </div>
                <h2 className={"text-2xl text-shadow-lg text-shadow-purple-400"}>From raw materials<br/>to finished goods<br/><br/>managed in one reactive
                    system</h2>
            </div>

            {/* Overview */}
            <div className={"w-1/2 text-white mb-18 text-shadow-lg text-shadow-purple-300"}>
                <p>
                    We allow businesses to manage their products, materials, clients, suppliers, and stock movements in
                    one place. Orders are used to record inbound and outbound movements, and a built-in production
                    system lets users manufacture products from raw materials using a Bill of Materials (BOM).
                </p>
            </div>

            {/* Login / Register */}
            <div className={"bg-gray-700 p-6 rounded-2xl flex flex-col items-center gap-10 text-white"}>
                <h2 className={"text-5xl font-bold"}>Try out now!</h2>
                <div className={"flex gap-10"}>
                    <Link to="/login"
                          className={"bg-cyan-500 p-4 text-4xl font-bold border-2 border-cyan-600 rounded-xl hover:bg-sky-500 transition duration-200"}>Login</Link>
                    <Link to="/register"
                          className={"bg-white p-4 text-black text-4xl font-bold border-2 border-gray-200 rounded-xl hover:bg-mauve-300 transition duration-200"}>Register</Link>
                </div>
            </div>

            {/* Features */}
            <div className={"bg-gray-700 p-6 rounded-2xl flex flex-row items-center gap-10 text-white"}>
                <h2 className={"text-6xl font-bold text-left"}>Features<br/>we<br/>offer</h2>
                <div className={"grid gap-4 grid-cols-1 lg:grid-cols-2"}>
                    <Feature name={"Clients & Suppliers"}
                             description={"Register companies, give them roles as client, supplier or both!"}
                             color={"purple1"}/>
                    <Feature name={"Products & Materials"}
                             description={"Create and categorise inventory items with pricing and measurement units"}
                             color={"purple2"}/>
                    <Feature name={"Orders & Movements"}
                             description={"Record inbound (from suppliers) and outbound (to clients) stock movements, with flexible discount support via a DiscountParser (e.g. 2%+3%)"}
                             color={"blue1"}/>
                    <Feature name={"Production Orders"}
                             description={"Trigger production runs that consume materials and increment product stock, with a real-time status flow (Pending → In Progress → Completed / Failed)"}
                             color={"blue2"}/>
                    <Feature name={"Bill of Materials (BOM)"}
                             description={"Define which materials are required to produce a product"}
                             color={"pink1"}/>
                    <Feature name={"Categories"}
                             description={"Shared or type-specific categories for products and materials"}
                             color={"pink2"}/>
                    <Feature name={"Dashboard"}
                             description={"Generate reports over a chosen period and visualise stock and order data through charts"}
                             color={"orange1"}/>
                    <Feature name={"Audit Log"}
                             description={"Track significant business events across the application for traceability"}
                             color={"orange2"}/>
                </div>
            </div>

            {/* Links */}
            <div className={"text-white bg-gray-700 p-6 rounded-2xl flex flex-row items-center gap-10"}>
                <h2 className={"text-6xl font-bold text-left"}>Tech<br/>we<br/>used</h2>
                <div className={"flex flex-col gap-3 justify-center items-center"}>
                    <IconLink href={"https://github.com/antohus-liga/reactive-management"} src={"/github.png"}
                              alt={"GitHub"}/>
                    <div className={"flex flex-col gap-6"}>
                        <ul className={"flex flex-row gap-2 bg-blue-400 p-2 rounded-lg hover:drop-shadow-xl hover:drop-shadow-sky-600 transition duration-200"}>
                            <IconLink href={"https://typescriptlang.org"} src={"/typescript.png"} alt={"TypeScript"}/>
                            <IconLink href={"https://react.dev"} src={"/react.png"} alt={"React"}/>
                            <IconLink href={"https://vite.dev"} src={"/vite.png"} alt={"Vite"}/>
                        </ul>
                        <ul className={"flex flex-row gap-2 bg-black p-2 rounded-lg hover:drop-shadow-xl hover:drop-shadow-black transition duration-200"}>
                            <IconLink href={"https://kotlinlang.org"} src={"/kotlin.png"} alt={"Kotlin"}/>
                            <IconLink href={"https://spring.io/projects/spring-boot"} src={"/spring.png"}
                                      alt={"Spring"}/>
                            <IconLink href={"https://www.postgresql.org"} src={"/postgresql.png"} alt={"PostgreSQL"}/>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function IconLink({href, src, alt}: { href: string; src: string; alt: string }) {
    return (
        <a href={href} target={"_blank"}>
            <img className={"size-18"} src={src} alt={alt}/>
        </a>
    )
}

function Feature({name, description, color}: {
    name: string;
    description: string;
    color: "blue1" | "blue2" | "pink1" | "pink2" | "purple1" | "purple2" | "orange1" | "orange2"
}) {
    const colors = {
        blue1: "bg-blue-900 hover:drop-shadow-blue-700",
        blue2: "bg-blue-950 hover:drop-shadow-blue-800",
        pink1: "bg-pink-700 hover:drop-shadow-pink-600",
        pink2: "bg-pink-800 hover:drop-shadow-pink-700",
        purple1: "bg-purple-900 hover:drop-shadow-purple-600",
        purple2: "bg-purple-950 hover:drop-shadow-purple-700",
        orange1: "bg-orange-700 hover:drop-shadow-orange-600",
        orange2: "bg-orange-800 hover:drop-shadow-orange-700",
    };

    return (
        <div className={`w-80 p-4 ${colors[color]} rounded-lg hover:drop-shadow-xl transition duration-200`}>
            <h3 className={"font-bold"}>{name}</h3>
            <p> {description} </p>
        </div>
    )
}