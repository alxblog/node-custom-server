import { Outlet, useMatches } from "react-router";
import { TopBar } from "~/components/topbar";

export default function layout() {
	const matches = useMatches()
	const { handle } = matches[matches.length - 1] as { handle?: { pageTitle?: string } }
	
		return (
		<div className="min-h-full">
			<TopBar />
			<div className="py-10">
				{handle?.pageTitle && <header>
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 capitalize">{handle.pageTitle}</h1>
					</div>
				</header>}
				<main>
					<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
						{ /* Your content */}
						<Outlet />
					</div>
				</main>
			</div>
		</div>
	)
}