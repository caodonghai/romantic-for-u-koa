const koaRequest = require("koa2-request");

exports.analysisVideoUrl1 = async (ctx) => {
    //第一步获取视频ID
    let req_query = ctx.request.query;
    let videoUrl = req_query.videoUrl;
    const url = decodeURIComponent(videoUrl)
    const longUrl = await koaRequest(url);
    console.log({longUrl})
    const videoId = longUrl.request.path.substr(13, 19);
    console.log({videoId})
    // https://www.douyin.com/video/6837396987122339084?previous_page=app_code_link
    const api = `https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${videoId}`;
    const res = await koaRequest(api);
    const { music, video, share_info } = res.data.item_list[0];
    console.log({music, video, share_info})
    const mp3 = music.play_url.uri;
    const mp4 = video.play_addr.url_list[0].replace('playwm', 'play');
    const title = share_info.share_title;
    ctx.body = {
        code: 200,
        data: {mp3, mp4, title}
    };
}

exports.analysisVideoUrl = async (ctx) => {
    let req_query = ctx.request.query;
    let videoUrl = req_query.videoUrl;
    if (videoUrl) {
        try {
            const url = decodeURIComponent(videoUrl)
            console.log({req_query, videoUrl, url})
            const { videoStream, share_title } = await runDouyin(url);
            console.log({videoStream, share_title})
            ctx.attachment(`${share_title}(无水印).mp4`);
            videoStream.pipe(ctx);
        } catch (e) {
            console.log('catch---->', {e});
            ctx.body = {
                code: 500,
                errMsg: '视频处理出错了！',
                data: {
                    error: e
                }
            };
        }
    } else {
        ctx.body = {
            code: 500,
            errMsg: '视频链接错误'
        }
    }
};

async function request(url, type) {
  const option = {
    url,
    method: 'get',
    headers: {
      'user-agent': 'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Mobile Safari/537.36',
    },
  };
  if (type) {
    option.responseType = type;
  }
  return koaRequest(option);
}

async function runDouyin(shareUrl) {
    // 1.根据分享的视频地址，通过重定向获取整个html信息
    const html = await request(shareUrl);
    const videoId = html.request.path.substr(13, 19);
    console.log({shareUrl, videoId})
    // https://m.douyin.com/share/video/6837396987122339084
    // const long_url = `https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${videoId}`;
    const long_url = `https://m.douyin.com/share/video/${videoId}`;
    const { data: videoJson } = await request(long_url);
    console.log({videoJson})
    // 3.最后通过uri参数来调用视频下载接口
    const uriId = videoJson.item_list[0].video.play_addr.uri;
    const share_title = videoJson.item_list[0].share_info.share_title;
    const noWatermarkUrl = `https://aweme.snssdk.com/aweme/v1/play/?video_id=${uriId}&line=0&ratio=540p&media_type=4&vr_type=0&improve_bitrate=0&is_play_url=1&is_support_h265=0&source=PackSourceEnum_PUBLISH`;
    const { data: videoStream } = await request(noWatermarkUrl, 'stream');
    return { videoStream, share_title };
}
