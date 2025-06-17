import { NavLink } from "react-router"
import { MobileMenu, MobileMenuButton } from "./mobile-menu"
import clsx from "clsx"

const TopBarNav = ({ links }: { links: link[] }) => {
	return (
		<div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
			{links.map(({ label, link }) => <NavLink key={label} to={link}
				className={({ isActive }) => clsx('inline-flex items-center border-b-2', isActive && 'border-primary  text-gray-900', !isActive && 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700', 'px-1 pt-1 text-sm font-medium')
				}
			>{label}</NavLink>
			)}
		</div>
	)
}

type link = {
	label: string,
	link: string
}

export const TopBar = () => {
	const pages = [
		{ label: "Dashboard", link: "/" },
		{ label: "Events", link: "events" },
		{ label: "Projects", link: "projects" },
		{ label: "Calendar", link: "calendar" },
	]
	return <nav className="border-b border-gray-200 bg-white">
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div className="flex h-16 justify-between">
				<div className="flex">
					{/* <div className="flex flex-shrink-0 items-center">
						<img className="block h-8 w-auto lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
						<img className="hidden h-8 w-auto lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
					</div> */}
					<TopBarNav links={pages} />
				</div>
				<div className="hidden sm:ml-6 sm:flex sm:items-center">
					<button type="button" className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
						<span className="absolute -inset-1.5" />
						<span className="sr-only">View notifications</span>
						<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
							<path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
						</svg>
					</button>
				</div>
				<div className="-mr-2 flex items-center sm:hidden"><MobileMenuButton /></div>
			</div>
		</div>
		<MobileMenu />
	</nav>
}