import React from 'react';
import { Header, HeaderContainer, HeaderName, HeaderGlobalBar, SkipToContent } from "carbon-components-react";

function MyHeader() {
    return <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
            <Header aria-label="webquake">
                <SkipToContent />
                <HeaderName to="/" prefix="WebQuake">
                    Editor sismogramma
                </HeaderName>
                <HeaderGlobalBar />
            </Header>
        )}
    />
}

export default MyHeader;