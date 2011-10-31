/*
 * Copyright 2009 Prime Technology.
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
package org.primefaces.component.outputpanel;

import java.io.IOException;

import javax.faces.FacesException;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;

import org.primefaces.renderkit.CoreRenderer;

public class OutputPanelRenderer extends CoreRenderer {

	public void encodeEnd(FacesContext facesContext, UIComponent component) throws IOException {
		ResponseWriter writer = facesContext.getResponseWriter();
		OutputPanel panel = (OutputPanel) component;
		String tagName = getLayoutTag(facesContext, panel);

		writer.startElement(tagName, panel);
		writer.writeAttribute("id", panel.getClientId(facesContext), "id");

		if(panel.getStyle() != null) {
			writer.writeAttribute("style", panel.getStyle(), "style");
		}
		if(panel.getStyleClass() != null) {
			writer.writeAttribute("class", panel.getStyleClass(), "styleClass");
		}

		renderChildren(facesContext, panel);

		writer.endElement(tagName);
	}

	public void encodeChildren(FacesContext facesContext, UIComponent component) throws IOException {
		//Do nothing
	}

	public boolean getRendersChildren() {
		return true;
	}

	protected String getLayoutTag(FacesContext facesContext, OutputPanel panel) {
		String layout = panel.getLayout();
		if(layout.equalsIgnoreCase("inline"))
			return "span";
		else if(layout.equalsIgnoreCase("block"))
			return "div";
		else
			throw new FacesException("Layout type '" + layout + "' is not a valid value for OutputPanel '" + panel.getClientId(facesContext)  + "'");
	}

}
