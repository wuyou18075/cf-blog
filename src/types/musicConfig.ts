// 音乐播放器配置
export type MusicTrack = {
	name: string; // 歌曲名称
	artist: string; // 艺术家
	url: string; // 音乐文件路径（相对 public）或完整 URL
	cover?: string; // 封面图片路径（相对 public）或完整 URL
	lrc?: string; // 歌词内容、LRC 文件路径或完整 URL
};

export type MetingConfig = {
	// Meting API 地址
	api?: string;

	// 音乐平台：netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
	server?: "netease" | "tencent" | "kugou" | "xiami" | "baidu";

	// 类型：song=单曲, playlist=歌单, album=专辑, search=搜索, artist=艺术家
	type?: "song" | "playlist" | "album" | "search" | "artist";

	// 歌单/专辑/单曲 ID 或搜索关键词
	id?: string;

	// 认证 token（可选）
	auth?: string;

	// 备用 API 配置（当主 API 失败时使用）
	fallbackApis?: string[];
};

// 可切换的音源（在线歌单 / 本地专辑等）
export type MusicSource = {
	id: string; // 唯一标识
	name: string; // 显示名（如「在线歌单」「叶惠美」）
	// 使用方式：'meting' 或 'local'
	mode: "meting" | "local";
	meting?: MetingConfig;
	local?: {
		playlist?: MusicTrack[];
	};
};

export type MusicPlayerConfig = {
	// 使用方式：'meting' 或 'local'（无 sources 时生效；有 sources 时作为默认源的回退）
	mode?: "meting" | "local";

	// 默认音量 (0-1)
	volume?: number;

	// 播放模式：'list'=列表循环, 'one'=单曲循环, 'random'=随机播放
	playMode?: "list" | "one" | "random";

	// 是否显示歌词
	showLyrics?: boolean;

	// 是否在导航栏显示音乐播放器
	showInNavbar?: boolean;

	// 是否在侧边栏显示音乐播放器组件
	showInSidebar?: boolean;

	// 默认音源 id（对应 sources[].id）；未配置则取 sources 第一项或 mode 回退
	defaultSourceId?: string;

	// 多音源列表：在线歌单 + 本地专辑可并存，播放器内切换
	// 若配置了 sources，优先使用；否则退回 mode + meting/local
	sources?: MusicSource[];

	// Meting API 配置（无 sources 时使用；有 sources 时也可作为某一项的配置）
	meting?: MetingConfig;

	// 本地音乐配置（当 mode 为 'local' 时使用）
	local?: {
		playlist?: MusicTrack[];
	};
};
