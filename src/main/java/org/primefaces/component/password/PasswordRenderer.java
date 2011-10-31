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
package org.primefaces.component.password;

import java.io.IOException;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;

import org.primefaces.renderkit.CoreRenderer;
import org.primefaces.util.ComponentUtils;
import org.primefaces.util.HTML;

public class PasswordRenderer extends CoreRenderer {

	@Override
	public void decode(FacesContext context, UIComponent component) {
		Password password = (Password) component;
		String clientId = password.getClientId(context);

		String submittedValue = (String) context.getExternalContext().getRequestParameterMap().get(clientId);
		password.setSubmittedValue(submittedValue);
	}

	@Override
	public void encodeEnd(FacesContext context, UIComponent component) throws IOException {
		Password password = (Password) component;

		encodeMarkup(context, password);
		encodeScript(context, password);
	}

	protected void encodeScript(FacesContext context, Password password) throws IOException {
		ResponseWriter writer = context.getResponseWriter();
		String clientId = password.getClientId(context);

		writer.startElement("script", null);
		writer.writeAttribute("type", "text/javascript", null);

		writer.write("jQuery(function(){");

		writer.write(password.resolveWidgetVar() + " = new PrimeFaces.widget.Password('" + clientId + "', {");

		writer.write("length:" + password.getMinLength());

		if(password.isInline()) writer.write(",flat:true");
		if(password.getLevel() != 1) writer.write(",type: "+password.getLevel());
		if(password.getPromptLabel() != null) writer.write(",promptLabel:'" + password.getPromptLabel() + "'");
		if(password.getWeakLabel() != null) writer.write(",weakLabel:'" + password.getWeakLabel() + "'");
		if(password.getGoodLabel() != null) writer.write(",goodLabel:'" + password.getGoodLabel() + "'");
		if(password.getStrongLabel() != null) writer.write(",strongLabel:'" + password.getStrongLabel() + "'");
		if(password.getOnshow() != null) writer.write(",onShow:" + password.getOnshow());
		if(password.getOnhide() != null) writer.write(",onHide:" + password.getOnhide());

        encodeClientBehaviors(context, password);

		writer.write("});});");

		writer.endElement("script");
	}

	protected void encodeMarkup(FacesContext context, Password password) throws IOException {
		ResponseWriter writer = context.getResponseWriter();
		String clientId = password.getClientId(context);

		writer.startElement("input", password);
		writer.writeAttribute("id", clientId, "id");
		writer.writeAttribute("name", clientId, null);
		writer.writeAttribute("type", "password", null);

		String valueToRender = ComponentUtils.getStringValueToRender(context, password);
		if(valueToRender != null) {
			writer.writeAttribute("value", valueToRender , null);
		}

		renderPassThruAttributes(context, password, HTML.INPUT_TEXT_ATTRS);

		if(password.getStyleClass() != null) {
			writer.writeAttribute("class", password.getStyleClass(), "styleClass");
		}

		writer.endElement("input");
	}
}