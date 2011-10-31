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
package org.primefaces.component.picklist;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;
import javax.faces.convert.Converter;
import javax.faces.convert.ConverterException;

import org.primefaces.model.DualListModel;
import org.primefaces.renderkit.CoreRenderer;

public class PickListRenderer extends CoreRenderer {

	@Override
	public void decode(FacesContext context, UIComponent component) {
		PickList pickList = (PickList) component;
		String clientId = pickList.getClientId(context);
		Map<String,String> params = context.getExternalContext().getRequestParameterMap();

		String sourceParam = clientId + "_source";
		String targetParam = clientId + "_target";
		if(params.containsKey(sourceParam) && params.containsKey(targetParam)) {
			pickList.setSubmittedValue(new String[]{params.get(sourceParam), params.get(targetParam)});
		}
	}

	@Override
	public void encodeEnd(FacesContext facesContext, UIComponent component) throws IOException {
		PickList pickList = (PickList) component;

		encodeMarkup(facesContext, pickList);
		encodeScript(facesContext, pickList);
	}

    protected void encodeMarkup(FacesContext context, PickList pickList) throws IOException {
		ResponseWriter writer = context.getResponseWriter();
		String clientId = pickList.getClientId(context);
		DualListModel model = (DualListModel) pickList.getValue();
        String styleClass = pickList.getStyleClass();
        styleClass = styleClass == null ? PickList.CONTAINER_CLASS : PickList.CONTAINER_CLASS + " " + styleClass;

		writer.startElement("table", pickList);
		writer.writeAttribute("id", clientId, "id");
        writer.writeAttribute("class", styleClass, null);
		if(pickList.getStyle() != null) {
            writer.writeAttribute("style", pickList.getStyle(), null);
        }

		writer.startElement("tbody", null);
		writer.startElement("tr", null);

        //Target List Reorder Buttons
        if(pickList.isShowSourceControls()) {
            writer.startElement("td", null);
            writer.writeAttribute("class", PickList.SOURCE_CONTROLS, null);
            encodeButton(context, pickList, pickList.getMoveUpLabel(), PickList.MOVE_UP_BUTTON_CLASS);
            encodeButton(context, pickList, pickList.getMoveTopLabel(), PickList.MOVE_TOP_BUTTON_CLASS);
            encodeButton(context, pickList, pickList.getMoveDownLabel(), PickList.MOVE_DOWN_BUTTON_CLASS);
            encodeButton(context, pickList, pickList.getMoveBottomLabel(), PickList.MOVE_BOTTOM_BUTTON_CLASS);
            writer.endElement("td");
        }

		//Source List
		writer.startElement("td", null);
        UIComponent sourceCaption = pickList.getFacet("sourceCaption");
        boolean hasSourceCaption = sourceCaption != null;
        if(hasSourceCaption) {
            encodeCaption(context, sourceCaption);
        }
		encodeList(context, pickList, clientId + "_source", PickList.SOURCE_CLASS, model.getSource(), hasSourceCaption);
		writer.endElement("td");

		//Buttons
		writer.startElement("td", null);
        encodeButton(context, pickList, pickList.getAddLabel(), PickList.ADD_BUTTON_CLASS);
        encodeButton(context, pickList, pickList.getAddAllLabel(), PickList.ADD_ALL_BUTTON_CLASS);
        encodeButton(context, pickList, pickList.getRemoveLabel(), PickList.REMOVE_BUTTON_CLASS);
        encodeButton(context, pickList, pickList.getRemoveAllLabel(), PickList.REMOVE_ALL_BUTTON_CLASS);
		writer.endElement("td");

		//Target List
		writer.startElement("td", null);
        UIComponent targetCaption = pickList.getFacet("targetCaption");
        boolean hasTargetCaption = targetCaption != null;
        if(hasTargetCaption) {
            encodeCaption(context, targetCaption);
        }
		encodeList(context, pickList, clientId + "_target", PickList.TARGET_CLASS, model.getTarget(), hasTargetCaption);
		writer.endElement("td");

        //Target List Reorder Buttons
        if(pickList.isShowTargetControls()) {
            writer.startElement("td", null);
            writer.writeAttribute("class", PickList.TARGET_CONTROLS, null);
            encodeButton(context, pickList, pickList.getMoveUpLabel(), PickList.MOVE_UP_BUTTON_CLASS);
            encodeButton(context, pickList, pickList.getMoveTopLabel(), PickList.MOVE_TOP_BUTTON_CLASS);
            encodeButton(context, pickList, pickList.getMoveDownLabel(), PickList.MOVE_DOWN_BUTTON_CLASS);
            encodeButton(context, pickList, pickList.getMoveBottomLabel(), PickList.MOVE_BOTTOM_BUTTON_CLASS);
            writer.endElement("td");
        }

		writer.endElement("tr");
		writer.endElement("tbody");

		writer.endElement("table");
	}

	protected void encodeScript(FacesContext facesContext, PickList pickList) throws IOException {
		ResponseWriter writer = facesContext.getResponseWriter();
		String clientId = pickList.getClientId(facesContext);

		writer.startElement("script", null);
		writer.writeAttribute("type", "text/javascript", null);

		writer.write(pickList.resolveWidgetVar() + " = new PrimeFaces.widget.PickList('" + clientId + "', {");
        writer.write("pojo:" + (pickList.getConverter() != null));
        writer.write(",effect:'" + pickList.getEffect() + "'");
        writer.write(",effectSpeed:'" + pickList.getEffectSpeed() + "'");
        writer.write(",iconOnly:" + pickList.isIconOnly());

        if(pickList.isShowSourceControls()) writer.write(",showSourceControls:true");
        if(pickList.isShowTargetControls()) writer.write(",showTargetControls:true");
        if(pickList.isDisabled()) writer.write(",disabled:true");
        if(pickList.getOnTransfer() != null) writer.write((",onTransfer:function(e) {" + pickList.getOnTransfer() + ";}"));

        writer.write("});");

		writer.endElement("script");
	}

    protected void encodeCaption(FacesContext context, UIComponent caption) throws IOException {
        ResponseWriter writer = context.getResponseWriter();

        writer.startElement("div", null);
        writer.writeAttribute("class", PickList.CAPTION_CLASS, null);
        caption.encodeAll(context);
        writer.endElement("div");
    }

	protected void encodeButton(FacesContext facesContext, PickList pickList, String label, String styleClass) throws IOException {
		ResponseWriter writer = facesContext.getResponseWriter();

        writer.startElement("button", null);
        writer.writeAttribute("type", "button", null);
		writer.writeAttribute("class", styleClass, null);
        writer.write(label);
        writer.endElement("button");
	}

	protected void encodeList(FacesContext context, PickList pickList, String listId, String styleClass, List model, boolean hasCaption) throws IOException {
		ResponseWriter writer = context.getResponseWriter();
        styleClass += hasCaption ? " ui-corner-bl ui-corner-br" : " ui-corner-all";

        writer.startElement("ul", null);
        writer.writeAttribute("class", styleClass, null);

        String values = encodeOptions(context, pickList, model);

        writer.endElement("ul");

		encodeListStateHolder(context, listId, values);
	}

	@SuppressWarnings("unchecked")
	protected String encodeOptions(FacesContext context, PickList pickList, List model) throws IOException {
		ResponseWriter writer = context.getResponseWriter();
		String var = pickList.getVar();
		Converter converter = pickList.getConverter();

		StringBuilder state = new StringBuilder();
        for(Iterator it = model.iterator(); it.hasNext();) {
            Object item = it.next();
			context.getExternalContext().getRequestMap().put(var, item);
			String value = converter != null ? converter.getAsString(context, pickList, pickList.getItemValue()) : (String) pickList.getItemValue();

			writer.startElement("li", null);
            writer.writeAttribute("class", PickList.ITEM_CLASS, null);
			writer.write(pickList.getItemLabel());
			writer.endElement("li");

			state.append(value);

            if(it.hasNext()) {
                state.append(",");
            }
		}

		context.getExternalContext().getRequestMap().remove(var);

		return state.toString();
	}

	protected void encodeListStateHolder(FacesContext context, String clientId, String values) throws IOException {
		ResponseWriter writer = context.getResponseWriter();

		writer.startElement("input", null);
		writer.writeAttribute("type", "hidden", null);
		writer.writeAttribute("id", clientId, null);
		writer.writeAttribute("name", clientId, null);
		writer.writeAttribute("value", values, null);
		writer.endElement("input");
	}

	@Override
	@SuppressWarnings("unchecked")
	public Object getConvertedValue(FacesContext facesContext, UIComponent component, Object submittedValue) throws ConverterException {
		PickList pickList = (PickList) component;
		String[] value = (String[]) submittedValue;
		String[] sourceList = value[0].split(",");
		String[] targetList = value[1].split(",");
		DualListModel model = new DualListModel();

		doConvertValue(facesContext, pickList, sourceList, model.getSource());
		doConvertValue(facesContext, pickList, targetList, model.getTarget());

		return model;
	}

	@SuppressWarnings("unchecked")
	protected void doConvertValue(FacesContext facesContext, PickList pickList, String[] values, List model) {
		Converter converter = pickList.getConverter();

		for(String value : values) {
			if(isValueBlank(value))
				continue;

			String val = value.trim();
			Object convertedValue = converter != null ? converter.getAsObject(facesContext, pickList, val) : val;

			if(convertedValue != null)
				model.add(convertedValue);
		}
	}
}