const koaRequest = require("koa2-request");

exports.analysisVideoUrl = async (ctx) => {
    //第一步获取视频ID
    let req_query = ctx.request.query;
    let videoUrl = req_query.videoUrl;
    const url = decodeURIComponent(videoUrl)
    let res_douyin = await koaRequest({ url: url })
    console.log({videoUrl, url, res_douyin})
    let str = res_douyin.request.uri.path
    let videoId = { aweme_id: str.match(/[0-9]{4,}/g)[0].toString() }
    console.log({videoId})
    // 第二步获取原始链接
    let response_play_addr = await koaRequest({
        url: 'https://aweme-hl.snssdk.com//aweme/v1/aweme/detail/',
        method: 'POST',
        headers: {
            'User-Agent': 'Aweme 8.6.0 rv:86018 (iPhone; iOS 12.4.1; zh_CN) Cronet',
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Cookie': 'tt_webid=6634504977698653700; __tea_sdk__user_unique_id=6634504977698653700; _ga=GA1.2.208565391.1537745943; sid_guard=71d5a5b4fa3e0c468238ecbd9d691d97%7C1552278354%7C153779948%7CWed%2C+24-Jan-2024+01%3A05%3A02+GMT; uid_tt=a300e88aa5c120b5611a6b13cab7c18a; sid_tt=71d5a5b4fa3e0c468238ecbd9d691d97; sessionid=71d5a5b4fa3e0c468238ecbd9d691d97; install_id=92266829107; ttreq=1$7197f8a6b34a717a2da10d65abebbd506367a3c5; odin_tt=3ab9acf1e079ef0b81e0c5a082f7e601078be15b11bbb9cd7d9d28373e3048ad825e194799f628d4d101a8e2ee131fd6',
        },
        json: true,
        form: videoId
    })
    console.log({response_play_addr})
    // 第三步无水印链接
    await koaRequest({
        url: response_play_addr.body.aweme_detail.video.play_addr.url_list[0],
        headers: {
            'User-Agent': 'Aweme 8.6.0 rv:86018 (iPhone; iOS 12.4.1; zh_CN) Cronet',
        },
    }).then(res => {
        ctx.body = {
            diff_time: new Date().getTime() - create_time,
            errcode: 0,
            msg: '抖音去水印ok',
            url: res.request.uri.href
        }
    })
}

exports.analysisVideoUrl2 = async (ctx) => {
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
  const { data: html } = await request(shareUrl);
  console.log({shareUrl, html})
  // 2.截取itemId， dytk 发起二次请求获取uriId
  const itemId = html.match(/(?<=itemId:\s\")\d+(?=\")/g)[0];
  const dytk = html.match(/(?<=dytk:\s\")(.*?)(?=\")/g)[0];
  const long_url = `https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids=${itemId}&dytk=${dytk}`;
  const { data: videoJson } = await request(long_url);
  // 3.最后通过uri参数来调用视频下载接口
  const uriId = videoJson.item_list[0].video.play_addr.uri;
  const share_title = videoJson.item_list[0].share_info.share_title;
  const noWatermarkUrl = `https://aweme.snssdk.com/aweme/v1/play/?video_id=${uriId}&line=0&ratio=540p&media_type=4&vr_type=0&improve_bitrate=0&is_play_url=1&is_support_h265=0&source=PackSourceEnum_PUBLISH`;
  const { data: videoStream } = await request(noWatermarkUrl, 'stream');
  return { videoStream, share_title };
}
