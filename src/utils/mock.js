// 引入mockjs
import Mock from 'mockjs';

// 设置1秒至4秒间响应
Mock.setup({
  timeout: '500-600',
});

// （1）、Basic

// 方法  含义
// Random.boolean( min?, max?, current? )  返回一个随机的布尔值。
// Random.natural( min?, max? )    返回一个随机的自然数（大于等于 0 的整数）。
// Random.integer( min?, max? )    返回一个随机的整数。
// Random.float( min?, max?, dmin?, dmax? )    返回一个随机的浮点数。
// Random.character( pool? )   返回一个随机字符
// Random.string( pool?, min?, max? )  返回一个随机字符串。
// （2）、 Date

// 方法  含义
// Random.date(format)     返回一个随机的日期字符串。
// Random.time( format? )  返回一个随机的时间字符串。
// Random.datetime( format? )  返回一个随机的日期和时间字符串。
// Random.now( unit?, format? )    返回当前的日期和时间字符串。
// （3）、 Image

// 方法  含义
// Random.image( size?, background?, foreground?, format?, text? )     生成一个随机的图片地址。
// Random.dataImage( size?, text? )    生成一段随机的 Base64 图片编码。
// （4）、Text

// 方法  含义
// Random.paragraph( min?, max? )  随机生成一段文本。
// Random.cparagraph( min?, max? )     随机生成一段中文文本。
// Random.sentence( min?, max? )   随机生成一个句子，第一个单词的首字母大写。
// Random.csentence( min?, max? )  随机生成一段中文文本。
// Random.word( min?, max? )   随机生成一个单词。
// Random.cword( pool?, min?, max? )   随机生成一个汉字。
// Random.title( min?, max? )  随机生成一句标题，其中每个单词的首字母大写。
// Random.ctitle( min?, max? )     随机生成一句中文标题。
// （5）、Name

// 方法  含义
// Random.first()  随机生成一个常见的英文名。
// Random.last()   随机生成一个常见的英文姓。
// Random.name( middle? )  随机生成一个常见的英文姓名。
// Random.cfirst()     随机生成一个常见的中文名。
// Random.clast()  随机生成一个常见的中文姓。
// Random.cname()  随机生成一个常见的中文姓名。
// （6）、Web

// 方法  含义
// Random.url( protocol?, host? )  随机生成一个 URL。
// Random.protocol()   随机生成一个 URL 协议。
// Random.domain()     随机生成一个域名。
// Random.tld()    随机生成一个顶级域名（TopLevelDomain）。
// Random.email( domain? )     随机生成一个邮件地址。
// Random.ip()     随机生成一个 IP 地址。
// （7）、Address

// 方法  含义
// Random.region()     随机生成一个（中国）大区。
// Random.province()   随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
// Random.city( prefix? )  随机生成一个（中国）市。
// Random.zip()    随机生成一个邮政编码（六位数字）。


// 获取 mock.Random 对象
const {
  Random,
} = Mock;
// mock一组数据
const produceNewsData = () => {
  const articles = [];
  for (let i = 0; i < 100; i++) {
    const newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: `${Random.date()} ${Random.time()}`, // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    articles.push(newArticleObject);
  }
  return {
    articles,
  };
};

const loginData = () => {
  const newArticleObject = {
    code: 200,
    sign: 'success',
    msg: {
      user_id: Random.integer(100000, 199999),
      image: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      nickname: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      award: Random.integer(1000, 199999),
      token: Random.string('abcdefijklmnopqrstuvwxyz0.123456789', 15, 15),
    },
  };
  return newArticleObject;
};
/**
 * 获取产品信息
 * @param {获取个数} num
 */
const getProductData = (num) => {
  const product = [];
  for (let i = 0; i < num; i++) {
    const productData = {
      productId: Random.integer(100000, 199999),
      image: Random.image('300x300', '#23d160', '#ffffff', 'product'),
      name: Random.ctitle(10, 20), // 随机生成一段中文标题
      price: Random.integer(1000, 199999),
      sale: Random.integer(1, 1000),
    };
    product.push(productData);
  }
  return product;
};
/**
 * 获取图片数据
 * @param {图片数量} num
 */
const getImageData = (num) => {
  const image = [];
  for (let i = 0; i < num; i++) {
    const imageData = {
      url: Random.image('375x252', '#ffdd57'),
      navpath: Random.url(),
    };
    image.push(imageData);
  }
  return image;
};
/**
 * 获取文章列表信息
 * @param {获取个数} num
 */
const getArticleData = (num) => {
  const data = [];
  for (let i = 0; i < num; i++) {
    const childData = {
      articleId: Random.integer(100000, 199999),
      image: Random.image('375x252', '#ffdd57'),
      title: Random.ctitle(10, 20), // 随机生成一段中文标题
      content: Random.csentence(60, 80),
    };
    data.push(childData);
  }
  return data;
};
/**
 * 获取分类数据
 * @param {数量} num
 */
const getCategoryData = (num) => {
  const data = [];
  for (let i = 0; i < num; i++) {
    const imageData = {
      url: Random.image('375x252', '#ffdd57'),
      navpath: Random.url(),
      category_id: Random.integer(100000, 199999),
      category_name: Random.ctitle(2, 5),
      sort: Random.integer(1, 100),
      store_id: Random.integer(100000, 199999),
    };
    data.push(imageData);
  }
  return data;
};
/**
 * 获取逛逛数据
 * @param {数量} num
 */
const getShopListData = (num) => {
  const data = [];
  for (let i = 0; i < num; i++) {
    const imageData = {
      title: Random.ctitle(5, 20),
      content: Random.csentence(20, 60),
      user_name: Random.cname(),
      user_image: Random.image('200x200', '#ffdd97'),
      store_name: Random.ctitle(5, 10),
      store_id: Random.integer(100000, 199999),
      comment_image: getImageData(Random.integer(0, 10)),
    };
    data.push(imageData);
  }
  return data;
};
const getContactListData = (num) => {
  const data = [];
  for (let i = 0; i < num; i++) {
    const imageData = {
      createDate: Random.datetime('M月d日'),
      content: Random.csentence(20, 60),
      user_name: Random.cname(),
      image: Random.image('200x200', '#ffdd97', 'FFF', 'user'),
      user_id: Random.integer(100000, 199999),
      content_type: 'M',
    };
    data.push(imageData);
  }
  return data;
};

const homeData = () => {
  const newArticleObject = {
    code: 200,
    sign: 'success',
    msg: {
      product: getProductData(6),
      image: getImageData(2),
      article: getArticleData(8),
    },
  };
  return newArticleObject;
};

const ProductListData = () => {
  const product = getProductData(8);
  const category = getCategoryData(6);
  const newArticleObject = {
    code: 200,
    sign: 'success',
    msg: {
      product,
      category,
    },
  };
  return newArticleObject;
};

const ProductListDataByCategroy = () => {
  const newArticleObject = {
    code: 200,
    sign: 'success',
    msg: getProductData(6),
  };
  return newArticleObject;
};
// Mock.mock( url, post/get , 返回的数据)；
const hostUrl = `${process.env.VUE_APP_BSAE_URL}/index.php?route=`; // 公共rul
Mock.mock(`${hostUrl}/index.php?route=shopapi/store/getdata`, 'post', produceNewsData);
Mock.mock(`${hostUrl}wechat/user/getdata&api=login`, 'post', loginData);// 登录
Mock.mock(`${hostUrl}shopapi/store/getdata?api=get_user_info`, 'post', loginData);// 获取用户数据
Mock.mock(`${hostUrl}shopapi/store/getdata?api=get_home_data`, 'post', homeData);// 获取首页数据
Mock.mock(`${hostUrl}shopapi/store/getdata?api=get_product_data`, 'post', ProductListData);// 获取产品数据
Mock.mock(`${hostUrl}shopapi/store/getdata?api=get_product_by_categroy`, 'post', ProductListDataByCategroy);// 获取产品数据
Mock.mock(`${hostUrl}shopapi/store/getdata?api=get_shop_list_data`, 'post', getShopListData(6));// 获取产品数据
Mock.mock(`${hostUrl}shopapi/store/getdata?api=get_contact_list`, 'post', getContactListData(6));// 获取联系人数据
