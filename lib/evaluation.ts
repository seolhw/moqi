export const getEvaluation = (score: number) => {
  switch (score) {
    case 10:
      return {
        title: "灵魂伴侣",
        description: "简直是天作之合！你们的默契度堪称完美，仿佛心灵相通。继续珍惜这份难得的默契吧！"
      };
    case 9:
      return {
        title: "天生一对",
        description: "你们的默契度令人羡慕！几乎在所有方面都心有灵犀，这份默契值得好好珍惜。"
      };
    case 8:
      return {
        title: "默契达人",
        description: "太棒了！你们在大多数方面都很默契。这种程度的理解和共鸣是很多人梦寐以求的。"
      };
    case 7:
      return {
        title: "心有灵犀",
        description: "你们的默契度相当高！虽然还有提升空间，但已经建立了深厚的理解和共鸣。"
      };
    case 6:
      return {
        title: "甜蜜搭档",
        description: "不错哦！你们在很多方面都很默契，这是一个良好的基础。继续加油，默契度还能更上一层楼！"
      };
    case 5:
      return {
        title: "有趣组合",
        description: "你们既有共同点，也有不同之处。这种平衡很有意思，既有默契又保持了各自的独特性。"
      };
    case 4:
      return {
        title: "潜力股",
        description: "虽然默契度还有提升空间，但这正是了解对方的好机会！多沟通，你们会发现更多共同点的。"
      };
    case 3:
      return {
        title: "反差萌",
        description: "哇，你们的想法还挺不一样的！别担心，这种反差也很有魅力。多交流，默契度一定会提高的！"
      };
    case 2:
      return {
        title: "趣味互补",
        description: "你们的想法很不同呢！但这可能正是你们关系的魅力所在。互相学习，会让生活更有趣哦。"
      };
    case 1:
      return {
        title: "独特火花",
        description: "哇哦，你们的想法真是南辕北辙啊！但别灰心，正是这种差异可能会擦出意想不到的火花哦。"
      };
    case 0:
      return {
        title: "惊喜之旅",
        description: "看来你们的想法大相径庭！别沮丧，这是一个充满惊喜的开始。慢慢了解对方，会发现更多有趣的事情的。"
      };
    default:
      return {
        title: "神秘组合",
        description: "哎呀，出了点小问题！不过别担心，无论结果如何，重要的是你们在一起的时光。继续加油哦！"
      };
  }
}