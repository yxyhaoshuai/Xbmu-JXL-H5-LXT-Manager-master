import React, {Component} from "react";
import "./index.less"
import {Route, Switch} from "react-router-dom";
import ArticleList from "./subPages/articleList";
import ArticleAdd from "./subPages/articleAdd";
import ArticleEdit from "./subPages/articleEdit";

class Article extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path={"/article"} exact={true} component={ArticleList}/>
                    <Route path={"/article/add"} component={ArticleAdd}/>
                    <Route path={"/article/edit/:id"} component={ArticleEdit}/>
                </Switch>

            </div>
        )
    }
}
export default Article;