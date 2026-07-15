import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export default function WelcomePage() {
    const {t} = useTranslation();
    return (
        <div className="flex flex-col items-center justify-center text-center gap-10 px-4 py-12 max-w-6xl mx-auto">
            {/* Title */}
            <div className="relative flex flex-col items-center justify-center gap-4 w-full">
                {/* Subtle radial gradient backdrop — purely decorative, sits behind content */}
                <div
                    className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[36rem] h-[36rem] rounded-full bg-[radial-gradient(closest-side,theme(colors.blue.100),transparent)] dark:bg-[radial-gradient(closest-side,theme(colors.blue.900/0.25),transparent)] blur-2xl -z-10"
                    aria-hidden="true"
                />
                <div className="rounded-full relative w-40 h-40 flex items-center justify-center">
                    <img
                        src="/favicon.png"
                        alt="logo"
                        className="absolute inset-0 w-full h-full object-contain opacity-35 dark:opacity-45"
                    />
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    Reactive Management
                </h1>
                <h2 className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {t("slogan1")}<br/>{t("slogan2")}
                </h2>
            </div>

            {/* Overview */}
            <div className="max-w-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <p>{t("pageDesc")}</p>
            </div>

            {/* Sign in / Register */}
            <div
                className="w-fit bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 rounded-2xl flex flex-col items-center gap-6">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{t("tryNow")}</h2>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                    <Link to="/signin"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-base font-medium rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 text-center">
                        {t("signIn")}
                    </Link>
                    <Link to="/register"
                          className="bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 px-6 py-3 text-base font-medium rounded-md transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 text-center">
                        {t("register")}
                    </Link>
                </div>
            </div>

            {/* Features */}
            <div
                className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 rounded-2xl flex flex-col lg:flex-row items-center gap-8 text-left">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 shrink-0 max-w-50 text-wrap">{t("features")}</h2>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 w-full">
                    <Feature name={t("cliAndSup")}
                             description={t("cliAndSupDesc")}
                             color={"blue"}/>
                    <Feature name={t("prodAndMat")}
                             description={t("prodAndMatDesc")}
                             color={"blue"}/>
                    <Feature name={t("ordersAndMov")}
                             description={t("ordersAndMovDesc")}
                             color={"violet"}/>
                    <Feature name={t("prod")}
                             description={t("prodDesc")}
                             color={"violet"}/>
                    <Feature name={t("bom")}
                             description={t("bomDesc")}
                             color={"amber"}/>
                    <Feature name={t("categories")}
                             description={t("categoriesDesc")}
                             color={"amber"}/>
                    <Feature name={t("dashboard")}
                             description={t("dashboardDesc")}
                             color={"emerald"}/>
                    <Feature name={t("audit")}
                             description={t("auditDesc")}
                             color={"emerald"}/>
                </div>
            </div>

            {/* Links */}
            <div
                className="w-fit bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 rounded-2xl flex flex-col lg:flex-row items-center gap-8">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 shrink-0 max-w-50 text-wrap">{t("tech")}</h2>
                <div className="flex flex-col gap-4 items-center">
                    <IconLink href={"https://github.com/antohus-liga/reactive-management"} src={"/github.png"}
                              alt={"GitHub"} invert={true}/>
                    <div className="flex flex-col gap-3">
                        <ul className="flex flex-row gap-2 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors duration-150">
                            <IconLink href={"https://typescriptlang.org"} src={"/typescript.png"} alt={"TypeScript"}
                                      invert={false}/>
                            <IconLink href={"https://react.dev"} src={"/react.png"} alt={"React"} invert={false}/>
                            <IconLink href={"https://vite.dev"} src={"/vite.png"} alt={"Vite"} invert={false}/>
                        </ul>
                        <ul className="flex flex-row gap-2 bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors duration-150">
                            <IconLink href={"https://kotlinlang.org"} src={"/kotlin.png"} alt={"Kotlin"}
                                      invert={false}/>
                            <IconLink href={"https://spring.io/projects/spring-boot"} src={"/spring.png"}
                                      alt={"Spring"} invert={false}/>
                            <IconLink href={"https://www.postgresql.org"} src={"/postgresql.png"} alt={"PostgreSQL"}
                                      invert={false}/>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

function IconLink({href, src, alt, invert}: { href: string; src: string; alt: string; invert: boolean }) {
    return (
        <a href={href} target={"_blank"} rel="noopener noreferrer"
           className={`opacity-80 hover:opacity-100 transition-opacity duration-150 ${invert ? "dark:invert" : ""}`}>
            <img className="size-10" src={src} alt={alt}/>
        </a>
    )
}

function Feature({name, description, color}: {
    name: string;
    description: string;
    color: "blue" | "violet" | "amber" | "emerald"
}) {
    // Muted accent dot per category — signals grouping without saturating the whole card
    const dotColors = {
        blue: "bg-blue-500",
        violet: "bg-violet-500",
        amber: "bg-amber-500",
        emerald: "bg-emerald-500",
    };

    return (
        <div
            className="p-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-lg transition-colors duration-150">
            <div className="flex items-center gap-2 mb-1.5">
                <span className={`size-1.5 rounded-full ${dotColors[color]}`}/>
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">{name}</h3>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{description}</p>
        </div>
    )
}
