export default function DashboardPage() {
    return (
        <>
            <div className={"flex flex-col gap-4"}>
                <div className={"flex flex-col gap-4"}>
                    <h2 className={"text-6xl"}>Summaries</h2>
                    <div>
                        <h3 className={"text-4xl"}>Clients</h3>
                    </div>
                    <hr className={"w-auto"}/>
                    <div>
                        <h3 className={"text-4xl"}>Suppliers</h3>
                    </div>
                    <hr className={"w-auto"}/>
                    <div>
                        <h3 className={"text-4xl"}>Materials</h3>
                    </div>
                    <hr className={"w-auto"}/>
                    <div>
                        <h3 className={"text-4xl"}>Products</h3>
                    </div>
                    <hr className={"w-auto"}/>
                    <div>
                        <h3 className={"text-4xl"}>Orders</h3>
                    </div>
                    <hr className={"w-auto"}/>
                    <div>
                        <h3 className={"text-4xl"}>Production</h3>
                    </div>
                </div>
                <hr className={"w-auto h-1 bg-white"}/>
                <div>
                    <h2 className={"text-6xl"}>Charts</h2>
                </div>
            </div>
        </>
    );
}

