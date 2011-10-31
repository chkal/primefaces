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
package org.primefaces.component.hotkey;

import java.io.IOException;
import java.util.Map;

import javax.faces.FacesException;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import javax.faces.event.ActionEvent;

import org.primefaces.renderkit.CoreRenderer;
import org.primefaces.util.ComponentUtils;

public class HotkeyRenderer extends CoreRenderer {

    @Override
	public void decode(FacesContext facesContext, UIComponent component) {
		Map<String, String> params = facesContext.getExternalContext().getRequestParameterMap();
		Hotkey hotkey = (Hotkey) component;

		if(params.containsKey(hotkey.getClientId(facesContext))) {
			hotkey.queueEvent(new ActionEvent(hotkey));
		}
	}

    @Override
	public void encodeEnd(FacesContext facesContext, UIComponent component) throws IOException {
		ResponseWriter writer = facesContext.getResponseWriter();
		Hotkey hotkey = (Hotkey) component;
		String clientId = hotkey.getClientId(facesContext);

		writer.startElement("script", null);
		writer.writeAttribute("type", "text/javascript", null);

        writer.write("jQuery(function() {");
		writer.write("jQuery(document).bind('keydown', '" + hotkey.getBind() + "', function(){");

		if(hotkey.getHandler() == null) {
			UIComponent form = ComponentUtils.findParentForm(facesContext,hotkey);

			if(form == null) {
				throw new FacesException("Hotkey '"+ clientId+ "' needs to be enclosed in a form when ajax mode is enabled");
			}

			writer.write(buildAjaxRequest(facesContext, hotkey, form.getClientId(facesContext), clientId));

		} else {
			writer.write(hotkey.getHandler());
		}

		writer.write(";return false;});});");

		writer.endElement("script");
	}
}