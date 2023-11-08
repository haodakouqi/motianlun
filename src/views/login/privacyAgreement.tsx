import { defineComponent } from 'vue'
import './protocol.scss'
// 状态组件需要使用 defineComponent
export default defineComponent({
  setup() {
    const textList = [
      { 
        subtitle: "我们如何收集您的用户信息",
        explanation: "当您在使⽤我们的服务时，我们将会收集、传输、存储和处理相关信息。我们利⽤这些信息为您提供 服务，从事与服务相关的研究与分析，提供个性化体验，跟踪服务使⽤情况，向合作伙伴提供反馈意⻅，展⽰⼴告，对服务进⾏宣传，提供客⼾⽀持，向您发送消息，备份系统，增强服务的安全性及遵 守相关法律义务。即使我们不保留此类信息，它仍将第⼀时间进⼊我们的服务器，并在服务器中⻓时间存储以满⾜系统的处理需求。 当您使⽤我们的服务时，我们可能会收集以下与您有关的信息: ",
        list: [
          { p: "1 您主动向我们提供的信息。例如：姓名、性别、出⽣⽇期、⾝份证号码、地址、电话号码、邮箱地 址、职业、教育背景、⼯作经历及其他相关信息。" },
          { p: "2 您未主动提供，但在使⽤服务时被⾃动收集的信息。例如：浏览器信息(⽤⼾代理)、浏览器类型、IP 地址、移动设备类型、⼴告标识符(IDFA)、⾕歌⼴告标识符(GAID)以及您查看、点击或通过其他⽅式进⾏⼴告互动的信息、域名、浏览过的⽹⻚以及使⽤不同技术和⽅法浏览⽹⻚的时⻓。" },
          { p: "3 我们还会使⽤Cookies收集您的有关信息。Cookies将收集您访问的设备和⽹络、访问的⽇期和时间 等有关信息。此类信息仅供内部使⽤（如优化服务等），并且，此类信息⽆法追踪到⽤⼾个⼈。 " },
          { p: "4 来⾃第三⽅合作伙伴的信息，⽐如为我们及我们的商业伙伴提供服务的公司。" }
        ]
      },
      {
        subtitle: "我们如何对外提供您的用户信息",
        explanation: "我们将您向我们提供的个⼈信息⽤于提供服务及内部运营。⽐如：",
        list: [
          { p: "1 提⾼服务质量，或帮助我们的顾客及合作伙伴提升他们的产品或服务；" },
          { p: "2 为内外部商业⽬的汇总数据；防范潜在的⾮法活动；为⽤⼾账⼾提供⽀持，实现顾客需求" },
          { p: "3 满⾜政府或法律要求；以及其他我们的条款所约定的⽤途。" },
          { p: "4 我们还可能会根据收集到的有关您设备的信息，基于您的兴趣、偏好、地理位置等，向您的设备投放 定制⼴告。 我们只会在符合适当的合法性基础的前提下收集、使⽤、共享和以其他⽅式处理您的个⼈信息。为了遵守相关法律法规的义务，必要时我们也可能会使⽤您的个⼈信息。" },
        ]
      },
      {
        subtitle: "我们如何对外提供您的用户信息",
        explanation: "",
        list: [
          { 
            p: "1.第三方共享",
            q: "原则上，我们不会与其他组织和个人共享您的用户信息，但以下情况除外："
          },
          { p: "1.1 在获取您明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的用户信息。" },
          { p: "1.2 为履行新时科技法定义务所必需的共享：我们可能会根据法律法规规定、诉讼、仲裁解决需要，或按行政、司法机关依法提出的要求，对外共享您的用户信息。" },
          { 
            p: "2 转让",
            q: "我们不会将您的用户信息转让给任何公司、组织和个人，但以下情况除外："
          },
          { p: "2.1 在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的用户信息。" },
          { p: "2.2 根据适用的法律法规、法律程序的要求、强制性的行政或司法要求所必须的情况进行提供。" },
          { p: "2.3 符合与您签署的相关协议（包括在线签署的电子协议）或其他的法律文件约定所提供。" },
          { p: "2.4 在新时科技与其他法律主体者发生合并、收购或破产清算情形，或其他涉及合并、收购或破产清算情形时，如涉及到用户信息转让，我们会要求新的持有您用户信息的公司、组织继续受本政策的约束，否则我们将要求该公司、组织和个人重新向您征求授权同意。如涉及破产且无承接方的情形，我们将依法对数据进行删除处理。" },
          { 
            p: "3 公开披露",
            q: "我们仅会在以下情况下，才会公开披露您的用户信息："
          },
          { p: "3.1 获得您明确同意或基于您的主动选择，我们可能会公开披露您的用户信息。" },
          { p: "3.2 根据法律、法规的要求、强制性的行政执法或司法要求所必须提供您个人信息的情况下，我们可能会依据所要求的个人信息类型和披露方式公开披露您的用户信息。在符合法律法规的前提下，当我们收到上述披露信息的请求时，我们会要求必须出具与之相应的法律文件，如传票或调查函。我们坚信，对于要求我们提供的信息，应该在法律允许的范围内尽可能保持透明。我们对所有的请求都进行了慎重的审查，以确保其具备合法依据，且仅限于执法部门因特定调查目的且有合法权利获取的数据。在法律法规许可的前提下，我们披露的文件均在加密密钥的保护之下。" },
          { 
            p: "4 共享、转让、公开披露用户信息时事先征得授权同意的例外",
            q: "以下情形中，共享、转让、公开披露您的用户信息无需事先征得您的授权同意："
          },
          { p: "4.1 与国家安全、国防安全有关的。" },
          { p: "4.2 与公共安全、公共卫生、重大公共利益有关的。" },
          { p: "4.3 与刑事侦查、起诉、审判和判决执行等有关的。" },
          { p: "4.4 出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的。" },
          { p: "4.5 您自行向社会公众公开的个人信息。" },
          { p: "4.6 从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。" },
          { p: "4.7 为履行我们的法定职责或者法定义务或响应政府主管部门指示所必需的。" },
        ]
      },
      {
        subtitle: "用户业务数据和公开信息",
        explanation: "不同于您的用户信息，对于用户业务数据和公开信息，新时科技将按如下方式处理：",
        list: [
          { p: "1 您通过新时科技提供的服务，加工、存储、上传、下载、分发以及通过其他方式处理的数据，均为您的用户业务数据，您完全拥有您的用户业务数据。新时科技作为服务提供商，我们只会严格执行您的指示处理您的业务数据，除按与您协商一致或执行明确的法律法规要求外，不对您的业务数据进行任何非授权的使用或披露。" },
          { p: "2 您应对您的用户业务数据来源、内容及处理数据的合法性负责，新时科技提示您谨慎判断数据来源、内容及处理数据的合法性，依法获得处理此类数据所需的个人同意或政府部门许可、备案或评估。因您的用户业务数据的来源、内容及对用户业务数据的处理活动违反法律法规、部门规章或国家政策而造成的全部结果及责任均由您自行承担。" },
        ]
      },
      {
        subtitle: "您如何管理您的用户信息",
        explanation: (
          <>
            <div class="code-pre">查询、更正和补充</div>
            <div class="code-pre">您可以登录新时科技网站通过【“个人设置”-“个人信息”】查询、管理（变更、补充）使用新时科技服务时而提交的基本业务信息（基本资料）和联系人信息。</div>
          </>
        ),
      },
      {
        subtitle: "我们如何使用 Cookie 和同类技术",
        explanation: "为确保新时科技网站正常运转，我们会在计算机或移动设备上存储Cookie及同类技术。",
      },
      {
        subtitle: "我们如何保护和保存您的用户信息",
        list: [
          { p: "1 新时科技非常重视您的信息安全。我们努力采取各种合理的物理、电子和管理方面的安全措施来保护您的用户信息。防止用户信息遭到未经授权访问、公开披露、使用、修改、损坏或丢失。例如，我们对新时科技网站提供 HTTPS 协议安全浏览方式；我们会使用加密技术提高用户信息的安全性；我们会使用受信赖的保护机制防止用户信息遭到恶意攻击；我们会部署访问控制机制，尽力确保只有授权人员才可访问用户信息；以及我们会举办安全和隐私保护培训课程，加强员工对于保护用户信息重要性的认识。" },
          { p: "2 我们会采取合理可行的措施，尽力避免收集无关的用户信息。我们只会在达成本政策所述目的所需的期限内保留您的用户信息，除非受到法律的允许。超出上述用户信息保存期限后，我们会对您的个人信息进行删除或匿名化处理。" },
          { p: "3 请使用复杂密码，协助我们保证您的账号安全。我们将尽力保障您发送给我们的任何信息的安全性。如果我们的物理、技术或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改或毁坏，导致您的合法权益受损，我们将承担相应的法律责任。" },
          { p: "4 在不幸发生用户信息安全事件（泄露、丢失等）后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知用户信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，上报用户信息安全事件的处置情况" },
          { p: "5 如出现新时科技服务停止运营的情形，我们会采取合理措施保护您用户信息安全，包括及时停止继续收集用户信息的活动；停止运营的通知将以逐一送达或公告的形式通知用户；并对所持有的个人信息进行删除或匿名化处理，但法律法规另有规定的除外。" },
          { p: "6 原则上，我们在中华人民共和国境内产生或收集的用户信息，将存储在中华人民共和国境内。新时科技将采取充分的保护标准保障您的用户数据及业务数据的安全性。" },
        ]
      },
      {
        subtitle: "未成年人用户信息的特别约定",
        list: [
          { p: "1 我们主要面向成年人提供本网站服务及其他相关产品。但我们非常重视对未成年人个人信息的保护，如您为未成年人，我们要求您请您的父母或其他监护人仔细阅读本政策的所有内容，并在征得您的父母或其他监护人同意的前提下使用我们的产品或服务以及向我们提供信息。" },
          { p: "2 请您知悉并理解，如果我们识别到您是未满14周岁的儿童，我们将可能拒绝向您提供认证服务。" },
          { p: "3 受制于现有技术和商业模式，我们很难在账号注册环节主动识别未成年人的个人信息，如果您是未成年的监护人，且您发现我们存在未经其授权获取未成年人个人信息的情况，您可通过本政策中公示的联系方式联系我们，我们在收到通知后会及时予以核查，并在核查属实后及时删除或匿名化处理相关信息。如我们主动审查发现存在前述情形的，我们也会主动对相关个人信息予以删除或进行匿名化处理。" }
        ]
      },
      {
        subtitle: "本政策的更新",
        list: [
          { p: "1 我们可能会对本政策进行不时地修订。" },
          { p: "2 未经您明确同意，我们不会限制您按照本政策所应享有的权利。我们会在专门页面上发布对本政策所做的任何修订。" },
          { p: "3 对于重大修订，我们还会提供更为显著的通知（包括对于某些服务，我们会通过网站公示的方式进行通知甚至向您提供弹窗提示，说明本政策的具体变更内容）。" },
          { p: "4 本政策所指的重大变更包括但不限于：" },
          { p: "4.1 我们的服务模式发生重大变化。如处理用户信息的目的、处理的用户信息类型、用户信息的使用方式等。" },
          { p: "4.2 我们在控制权、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有者变更等。" },
          { p: "4.3 用户信息共享、转让或公开披露的主要对象发生变化。" },
          { p: "4.4 您参与用户信息处理方面的权利及其行使方式发生重大变化。" },
          { p: "4.5 我们负责处理用户信息安全的责任部门、联络方式及投诉渠道发生变化时。" },
          { p: "4.6 用户信息安全影响评估报告表明存在高风险时。" },
        ]
      },
    ]
  
    const textDom = textList.reduce((tot, t, ti) => {
      const index = `${ti + 1}.`
      const { subtitle, explanation, list } = t
      if (subtitle) {
        tot.push(<h4 key={subtitle} class='protocol-content-subtitle'>{`${index}${subtitle}`}</h4>)
      }
      if (explanation) {
        tot.push(<div key={explanation} class='protocol-content-explanation'>{explanation}</div>)
      }
      if (list) {
        const lis = list.map((k: any, ki) => {
          return (
            <li key={k.p}>
              <div class="code-pre" v-html={`${index}${k.p}`}></div>
              {
                k.q ? <div class="code-pre" v-html={k.q}></div> : ''
              }
              
            </li>
          )
        })
        tot.push(<ul key={`${subtitle}-ui`} class='protocol-content-ul'>{lis}</ul>)
      }
      return tot
    }, [] as any[])
    return () => (
      <div class='protocol-container'>
        <h1 class='protocol-title'>隐私协议</h1>
        <div class='protocol-content'>
          <div class="protocol-flex">
            <h4 class='protocol-content-subtitle'>提示条款：</h4>
            <div>生效日期：2023年10月25日</div>
          </div>
          <div class='protocol-content-explanation'>
            您的信任对我们非常重要，我们深知用户信息安全的重要性，我们将按照法律法规要求，采取安全保护措施，保护您的用户信息安全可控。鉴此，西安新时科技有限公司（以下简称“新时科技”或者“我们”）制定本《西安新时科技有限公司官网法律声明及隐私权政策》（或简称“本政策”）并提醒您：在使用新时科技网站的服务前，请您务必仔细阅读并透彻理解本政策，在确认充分理解并同意后方使用相关产品和服务。一旦您开始使用新时科技服务，将被视为对本政策内容的接受和认可。
            如果您对我们的信息处理活动有任何疑问或疑虑，请通过support@custifymedia.com联系我们
          </div>
          {textDom}
        </div>
      </div>
    );
  }
})