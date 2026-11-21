# 《代码整洁之道》阅读笔记

> 阅读进度 3/17

## Chapter 2: Meaningful Names

**USE PRONOUNCEABLE NAMES 使用读得出来的名称**

- 有利于大脑记忆以及沟通交流，`genymdhms` 就不如 `generationTimestamp`

**USE SEARCHABLE NAMES 使用可搜索的名称**

- 避免过于通用的名称
- 变量名长度应该与其作用域大小相对应

**CLASS NAMES 类名**

- 名词或名词短语，不应该为动词

**METHOD NAMES 方法名**

- 动词或动词短语
- 属性访问器、修改器和断言应该根据其值命名，并依 Javabean 标准加上 get、set 和 is 前缀

**PICK ONE WORD PER CONCEPT 每个概念对应一个词**

- 比如 controller manager 就是相同概念的两个不同的词，同时使用容易产生混淆



## Chapter 3: Functions

**SMALL! 短小**

**DO ONE THING 只做一件事**

- 一件事指的是做在同一抽象层上的若干步骤

**ONE LEVEL OF ABSTRACTION PER FUNCTION 每个函数一个抽象层级**

- 3-1 代码中 `pageData.getHtml()`  位于较高抽象层，`PathParser.render(pagePath)` 位于中间抽象层，`.append("\n")` 位于相当低的抽象层

**SWITCH STATEMENTS switch 语句**

- 当多处重复出现了一个 switch 语句，可以考虑放到抽象工厂下面

**FUNCTION ARGUMENTS 函数参数**

- 尽量保持参数少，如果太多的话，可以考虑将其封装为类了

**HAVE NO SIDE EFFECTS 无副作用**

- 3-6 中函数名称看起来是只读，实际包含了 `Session.initialize( )` 的调用，容易掉坑

**COMMAND QUERY SEPARATION 分隔指令与询问**

- 避免出现一个函数同时 set 和 get，如 `public boolean set(String attribute, String value)`

**PREFER EXCEPTIONS TO RETURNING ERROR CODES 使用异常替代返回错误码**

- 当返回错误码时，就是在要求调用者立刻处理错误，进而导致调用者需要同时处理主逻辑和错误处理逻辑
- 更好的办法是使用异常替代返回错误码，并且避免使用 try-catch 结构（也是耦合了两种逻辑）

```java
// 3-1 HtmlUtil.java
public static String testableHtml(
  PageData pageData,
  boolean includeSuiteSetup
) throws Exception {
  WikiPage wikiPage = pageData.getWikiPage();
  StringBuffer buffer = new StringBuffer();
  if (pageData.hasAttribute("Test")) {
    if (includeSuiteSetup) {
      WikiPage suiteSetup =
      PageCrawlerImpl.getInheritedPage(
              SuiteResponder.SUITE_SETUP_NAME, wikiPage
      );
      if (suiteSetup != null) {
      WikiPagePath pagePath =
        suiteSetup.getPageCrawler().getFullPath(suiteSetup);
      String pagePathName = PathParser.render(pagePath);
      buffer.append("!include -setup .")
            .append(pagePathName)
            .append("\n");
      }
    }
    WikiPage setup =
      PageCrawlerImpl.getInheritedPage("SetUp", wikiPage);
    if (setup != null) {
      WikiPagePath setupPath =
        wikiPage.getPageCrawler().getFullPath(setup);
      String setupPathName = PathParser.render(setupPath);
      buffer.append("!include -setup .")
            .append(setupPathName)
            .append("\n");
    }
  }
  buffer.append(pageData.getContent());
  if (pageData.hasAttribute("Test")) {
    WikiPage teardown =
      PageCrawlerImpl.getInheritedPage("TearDown", wikiPage);
    if (teardown != null) {
      WikiPagePath tearDownPath =
        wikiPage.getPageCrawler().getFullPath(teardown);
      String tearDownPathName = PathParser.render(tearDownPath);
      buffer.append("\n")
            .append("!include -teardown .")
            .append(tearDownPathName)
            .append("\n");
    }
    if (includeSuiteSetup) {
      WikiPage suiteTeardown =
        PageCrawlerImpl.getInheritedPage(
                SuiteResponder.SUITE_TEARDOWN_NAME,
                wikiPage
        );
      if (suiteTeardown != null) {
        WikiPagePath pagePath =
          suiteTeardown.getPageCrawler().getFullPath (suiteTeardown);
        String pagePathName = PathParser.render(pagePath);
        buffer.append("!include -teardown .")
              .append(pagePathName)
              .append("\n");
      }
    }
  }
  pageData.setContent(buffer.toString());
  return pageData.getHtml();
}

// 3-2 HtmlUtil.java
public static String renderPageWithSetupsAndTeardowns(
  PageData pageData, 
  boolean isSuite
) throws Exception {
  boolean isTestPage = pageData.hasAttribute("Test");
  if (isTestPage) {
    WikiPage testPage = pageData.getWikiPage();
    StringBuffer newPageContent = new StringBuffer();
    includeSetupPages(testPage, newPageContent, isSuite);
    newPageContent.append(pageData.getContent());
    includeTeardownPages(testPage, newPageContent, isSuite);
    pageData.setContent(newPageContent.toString());
  }

  return pageData.getHtml();
}

// 3-3 HtmlUtil.java
public static String renderPageWithSetupsAndTeardowns(
  PageData pageData, 
  boolean isSuite
) throws Exception {
  if (isTestPage(pageData))
    includeSetupAndTeardownPages(pageData, isSuite);
  return pageData.getHtml();
}
```

```java
// 3-6 UserValidator.java
public class UserValidator {
  private Cryptographer cryptographer;

  public boolean checkPassword(String userName, String password) {
    User user = UserGateway.findByName(userName);
    if (user != User.NULL) {
      String codedPhrase = user.
      getPhraseEncodedByPassword();
      String phrase = cryptographer.decrypt(codedPhrase, password);
      if ("Valid Password".equals(phrase)) {
        Session.initialize();
        return true;
      }
    }
    return false;
  }
}
```



## Chapter 4: Comments

尽量写好代码以避免加注释！

**GOOD COMMENTS 好注释**

- 必要的 TODO 内容



## Chapter 5: Formatting

**VERTICAL FORMATTING 垂直格式**

- 评估一个项目的时候可以从平局文件行数去看一下【TODO 放图】
  ![](/img/5_2fig_martin.BKHjuRt5.jpg)

**Vertical Distance 垂直距离**

- 类属性集中声明在类的顶部/底部，避免放在中间
- 相关函数尽可能放在一起，调用者尽可能放在被调用者上面
- 概念相关的函数应该放在一起，不一定是调用关系，比如重载的函数
- 像报纸文章一样，按照层次从高到低的方式罗列函数，重要顶层函数放在上面，底层细节函数放在下面

```java
// 5-5 WikiPageResponder.java
public class WikiPageResponder implements SecureResponder {
  protected WikiPage page;
  protected PageData pageData;
  protected String pageTitle;
  protected Request request;
  protected PageCrawler crawler;

  public Response makeResponse(FitNesseContext context, Request request)
    throws Exception {
    String pageName = getPageNameOrDefault(request, “FrontPage”);
    loadPage(pageName, context);
    if (page == null)
      return notFoundResponse(context, request);
    else
      return makePageResponse(context);
  }

  private String getPageNameOrDefault(Request request, String defaultPageName)
  {
    String pageName = request.getResource();
    if (StringUtil.isBlank(pageName))
      pageName = defaultPageName;

    return pageName;
  }

  protected void loadPage(String resource, FitNesseContext context)
    throws Exception {
    WikiPagePath path = PathParser.parse(resource);
    crawler = context.root.getPageCrawler();
    crawler.setDeadEndStrategy(new VirtualEnabledPageCrawler());
    page = crawler.getPage(context.root, path);
    if (page != null)
      pageData = page.getData();
  }

  private Response notFoundResponse(FitNesseContext context, Request request)
    throws Exception {
    return new NotFoundResponder().makeResponse(context, request);
  }

  private SimpleResponse makePageResponse(FitNesseContext context)
    throws Exception {
    pageTitle = PathParser.render(crawler.getFullPath(page));
    String html = makeHtml(context);

    SimpleResponse response = new SimpleResponse();
    response.setMaxAge(0);
    response.setContent(html);
    return response;
  }
…
```



## Chapter 6: Objects and Data Structures



## Chapter 7: Error Handling



## Chapter 8: Boundaries



## Chapter 9: Unit Tests



## Chapter 10: Classes



## Chapter 11: Systems



## Chapter 12: Emergence



## Chapter 13: Concurrency



## Chapter 14: Successive Refinement



## Chapter 15: JUnit Internals



## Chapter 16: Refactoring SerialDate



## Chapter 17: Smells and Heuristics
