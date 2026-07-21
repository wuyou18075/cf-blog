import type { MusicPlayerConfig, MusicTrack } from "../types/musicConfig";

const METING = "https://api.injahow.cn/meting/?server=netease";

/** 周杰伦本地专辑曲目：音频放 public/assets/music/jay/<album>/<name>.mp3 */
function jayTrack(
	albumDir: string,
	name: string,
	songId: number,
	picId: string,
): MusicTrack {
	return {
		name,
		artist: "周杰伦",
		url: `/assets/music/jay/${albumDir}/${name}.mp3`,
		cover: `${METING}&type=pic&id=${picId}`,
		lrc: `${METING}&type=lrc&id=${songId}`,
	};
}

// 音乐播放器配置
export const musicPlayerConfig: MusicPlayerConfig = {
	// 是否在导航栏显示音乐播放器入口
	showInNavbar: true,

	// 是否在侧边栏显示音乐播放器组件
	showInSidebar: true,

	// 无 sources 时的回退模式（有 sources 时以 defaultSourceId 为准）
	mode: "meting",

	// 默认音量 (0-1)
	volume: 0.7,

	// 播放模式：'list'=列表循环, 'one'=单曲循环, 'random'=随机播放
	playMode: "list",

	// 是否显启用歌词
	showLyrics: true,

	// 默认选中在线动态歌单
	defaultSourceId: "online",

	// Meting API 配置（保留：无 sources 时的回退，以及 sources 中可复用）
	// type=playlist 时每次打开站点会向网易云拉取最新曲目列表 → 动态歌单
	meting: {
		api: "https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
		// 音乐平台：netease=网易云音乐, tencent=QQ音乐, kugou=酷狗音乐, xiami=虾米音乐, baidu=百度音乐
		server: "netease",
		// 类型：song=单曲, playlist=歌单, album=专辑, search=搜索, artist=艺术家
		type: "playlist",
		// 歌单 ID（可换成你自己的网易云歌单）
		id: "10046455237",
		auth: "",
		fallbackApis: [
			"https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id",
			"https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
		],
	},

	// 多音源：在线动态歌单 + 周杰伦本地专辑
	// 杰伦专辑音源因版权无法走公共 Meting 直链，需把有权使用的 mp3 放到对应目录
	sources: [
		{
			id: "online",
			name: "在线歌单",
			mode: "meting",
			meting: {
				api: "https://api.injahow.cn/meting/?server=:server&type=:type&id=:id",
				server: "netease",
				type: "playlist",
				id: "10046455237",
				fallbackApis: [
					"https://api.moeyao.cn/meting/?server=:server&type=:type&id=:id",
					"https://api.i-meto.com/meting/api?server=:server&type=:type&id=:id&r=:r",
				],
			},
		},
		{
			id: "jay-yehuimei",
			name: "叶惠美 · 周杰伦",
			mode: "local",
			local: {
				playlist: [
					jayTrack("叶惠美", "晴天", 186016, "109951165566379710"),
					jayTrack("叶惠美", "以父之名", 186014, "109951165566379710"),
					jayTrack("叶惠美", "东风破", 186018, "109951165566379710"),
					jayTrack("叶惠美", "她的睫毛", 186021, "109951165566379710"),
					jayTrack("叶惠美", "三年二班", 186017, "109951165566379710"),
					jayTrack("叶惠美", "你听得到", 186019, "109951165566379710"),
					jayTrack("叶惠美", "同一种调调", 186020, "109951165566379710"),
					jayTrack("叶惠美", "爱情悬崖", 186022, "109951165566379710"),
					jayTrack("叶惠美", "梯田", 186023, "109951165566379710"),
					jayTrack("叶惠美", "双刀", 186024, "109951165566379710"),
				],
			},
		},
		{
			id: "jay-qilixiang",
			name: "七里香 · 周杰伦",
			mode: "local",
			local: {
				playlist: [
					jayTrack("七里香", "我的地盘", 186000, "7746059418324672"),
					jayTrack("七里香", "七里香", 186001, "7746059418324672"),
					jayTrack("七里香", "借口", 186002, "7746059418324672"),
					jayTrack("七里香", "将军", 186004, "7746059418324672"),
					jayTrack("七里香", "搁浅", 186005, "7746059418324672"),
					jayTrack("七里香", "乱舞春秋", 186006, "7746059418324672"),
					jayTrack("七里香", "困兽之斗", 186007, "7746059418324672"),
					jayTrack("七里香", "园游会", 186008, "7746059418324672"),
					jayTrack("七里香", "止战之殇", 186009, "7746059418324672"),
					jayTrack("七里香", "断了的弦", 186011, "7746059418324672"),
				],
			},
		},
		{
			id: "jay-shibanyue",
			name: "十一月的萧邦 · 周杰伦",
			mode: "local",
			local: {
				playlist: [
					jayTrack("十一月的萧邦", "夜曲", 185904, "109951167749320136"),
					jayTrack("十一月的萧邦", "蓝色风暴", 185905, "109951167749320136"),
					jayTrack("十一月的萧邦", "发如雪", 185906, "109951167749320136"),
					jayTrack("十一月的萧邦", "黑色毛衣", 185908, "109951167749320136"),
					jayTrack("十一月的萧邦", "枫", 185912, "109951167749320136"),
					jayTrack("十一月的萧邦", "浪漫手机", 185914, "109951167749320136"),
					jayTrack("十一月的萧邦", "逆鳞", 185916, "109951167749320136"),
					jayTrack("十一月的萧邦", "麦芽糖", 185918, "109951167749320136"),
					jayTrack("十一月的萧邦", "飘移", 185922, "109951167749320136"),
					jayTrack("十一月的萧邦", "一路向北", 185924, "109951167749320136"),
				],
			},
		},
		{
			id: "jay-wohenmang",
			name: "我很忙 · 周杰伦",
			mode: "local",
			local: {
				playlist: [
					jayTrack("我很忙", "牛仔很忙", 185807, "109951163533011733"),
					jayTrack("我很忙", "彩虹", 185809, "109951163533011733"),
					jayTrack("我很忙", "青花瓷", 185811, "109951163533011733"),
					jayTrack("我很忙", "阳光宅男", 185813, "109951163533011733"),
					jayTrack("我很忙", "蒲公英的约定", 185815, "109951163533011733"),
					jayTrack("我很忙", "无双", 185817, "109951163533011733"),
					jayTrack("我很忙", "我不配", 185818, "109951163533011733"),
					jayTrack("我很忙", "扯", 185819, "109951163533011733"),
					jayTrack("我很忙", "甜甜的", 185820, "109951163533011733"),
					jayTrack("我很忙", "最长的电影", 185821, "109951163533011733"),
				],
			},
		},
	],

	// 无 sources 时的本地回退（一般不会走到）
	local: {
		playlist: [],
	},
};
