// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env:"cloud-wxca5be5bc7eede253"
})

// 云函数入口函数
exports.main = async (event, context) => {
    try{
      const {OPENID} = cloud.getWXContext();
      const result = await cloud.openapi.subscribeMessage.send({
        touser:OPENID,
        page:'pages/index/index',
        data:{
          thing1:{
            value:event.message.name
          },
          thing3:{
            value:event.message.content
          },
          time2:{
            value:event.message.time
          },
          phrase4:{
            value:event.message.state
          },
          phone_number6:{
            value:event.message.phone
          }
        },
        templateId:'EHnKQwB95VJUbehyLeq2dbnQpCM__Z7XbIU_rUfz5h4'
      })
      console.log(result)
      return result
    }catch(err){
      console.log(err)
      return err
    }
}