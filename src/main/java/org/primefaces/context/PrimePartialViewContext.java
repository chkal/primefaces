/*
 * Copyright 2010 Prime Technology.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.primefaces.context;

import java.util.Collection;
import javax.faces.context.FacesContext;
import javax.faces.context.PartialResponseWriter;
import javax.faces.context.PartialViewContext;
import javax.faces.context.PartialViewContextWrapper;
import org.primefaces.util.Constants;

public class PrimePartialViewContext extends PartialViewContextWrapper {

    private PartialViewContext wrapped;
    private PartialResponseWriter writer = null;

    public PrimePartialViewContext(PartialViewContext wrapped) {
        this.wrapped = wrapped;
        if(isAjaxRequest()) {
            new DefaultRequestContext();    //initialize RequestContext instance
        }
    }

    @Override
    public PartialViewContext getWrapped() {
        return this.wrapped;
    }

    @Override
    public void setPartialRequest(boolean value) {
        getWrapped().setPartialRequest(value);
    }

    @Override
    public PartialResponseWriter getPartialResponseWriter() {
        if (writer == null) {
            PartialResponseWriter parentWriter = getWrapped().getPartialResponseWriter();
            writer = new PrimePartialResponseWriter(parentWriter);
        }

        return writer;
    }

    @Override
    public Collection<String> getRenderIds() {
        RequestContext requestContext = RequestContext.getCurrentInstance();

        if (requestContext == null || requestContext.getPartialUpdateTargets().isEmpty()) {
            return getWrapped().getRenderIds();
        } else {
            requestContext.addPartialUpdateTargets(getWrapped().getRenderIds());

            return requestContext.getPartialUpdateTargets();
        }
    }
}