export interface Menu {
	name: string;
	url: string;
}

export interface MenuItem extends Menu {
	expanded: boolean;
	subs: MenuItem[];
	params: { [key: string]: string }
}
