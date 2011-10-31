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
package org.primefaces.component.wizard;

import java.io.IOException;
import java.util.Iterator;
import java.util.Map;

import javax.faces.FacesException;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.context.ResponseWriter;

import org.primefaces.component.tabview.Tab;
import org.primefaces.context.RequestContext;
import org.primefaces.event.FlowEvent;
import org.primefaces.renderkit.CoreRenderer;
import org.primefaces.util.ComponentUtils;

public class WizardRenderer extends CoreRenderer {

    @Override
    public void encodeEnd(FacesContext fc, UIComponent component) throws IOException {
        Wizard wizard = (Wizard) component;

        if(wizard.isWizardRequest(fc)) {
            Map<String, String> params = fc.getExternalContext().getRequestParameterMap();
            String stepToDisplay = null;
            String clientId = wizard.getClientId(fc);
            String currentStep = wizard.getStep();
            String stepToGo = params.get(clientId + "_stepToGo");

            if (fc.isValidationFailed()) {
                stepToDisplay = currentStep;

            } else {
                if (wizard.getFlowListener() != null) {
                    FlowEvent flowEvent = new FlowEvent(wizard, currentStep, stepToGo);
                    Object outcome = wizard.getFlowListener().invoke(fc.getELContext(), new Object[]{flowEvent});
                    stepToDisplay = (String) outcome;
                } else {
                    stepToDisplay = stepToGo;
                }
            }

            wizard.setStep(stepToDisplay);

            UIComponent tabToDisplay = null;
            for (UIComponent child : wizard.getChildren()) {
                if (child.getId().equals(stepToDisplay)) {
                    tabToDisplay = child;
                }
            }

            tabToDisplay.encodeAll(fc);

            RequestContext.getCurrentInstance().addCallbackParam("currentStep", wizard.getStep());

        } else {
            encodeMarkup(fc, wizard);
            encodeScript(fc, wizard);
        }
    }

    protected void encodeScript(FacesContext facesContext, Wizard wizard) throws IOException {
        ResponseWriter writer = facesContext.getResponseWriter();
        String clientId = wizard.getClientId(facesContext);

        UIComponent form = ComponentUtils.findParentForm(facesContext, wizard);
        if (form == null) {
            throw new FacesException("Wizard : \"" + clientId + "\" must be inside a form element");
        }

        writer.startElement("script", null);
        writer.writeAttribute("type", "text/javascript", null);

        writer.write(wizard.resolveWidgetVar() + " = new PrimeFaces.widget.Wizard('" + clientId + "',{");
        writer.write("formId:'" + form.getClientId(facesContext) + "'");
        writer.write(",url:'" + getActionURL(facesContext) + "'");

        writer.write(",showStepStatus:" + wizard.isShowStepStatus());
        writer.write(",showNavBar:" + wizard.isShowNavBar());

        if(wizard.getOnback() != null) {
            writer.write(",onback:function(){" + wizard.getOnback() + "}");
        }
        if(wizard.getOnnext() != null) {
            writer.write(",onnext:function(){" + wizard.getOnnext() + "}");
        }

        //all steps
        writer.write(",steps:[");
        boolean firstStep = true;
        String defaultStep = null;
        for (Iterator<UIComponent> children = wizard.getChildren().iterator(); children.hasNext();) {
            UIComponent child = children.next();

            if (child instanceof Tab && child.isRendered()) {
                Tab tab = (Tab) child;
                if (defaultStep == null) {
                    defaultStep = tab.getId();
                }

                if (!firstStep) {
                    writer.write(",");
                } else {
                    firstStep = false;
                }

                writer.write("'" + tab.getId() + "'");
            }
        }
        writer.write("]");

        //current step
        if (wizard.getStep() == null) {
            wizard.setStep(defaultStep);
        }

        writer.write(",initialStep:'" + wizard.getStep() + "'");

        if (wizard.isEffect()) {
            writer.write(",effect:true");
            writer.write(",effectSpeed:'" + wizard.getEffectSpeed() + "'");
        }

        writer.write("});");

        writer.endElement("script");
    }

    protected void encodeMarkup(FacesContext facesContext, Wizard wizard) throws IOException {
        ResponseWriter writer = facesContext.getResponseWriter();
        String clientId = wizard.getClientId(facesContext);
        String styleClass = wizard.getStyleClass() == null ? "ui-wizard ui-widget" : "ui-wizard ui-widget " + wizard.getStyleClass();

        writer.startElement("div", wizard);
        writer.writeAttribute("id", clientId, "id");
        writer.writeAttribute("class", styleClass, "styleClass");
        if(wizard.getStyle() != null) {
            writer.writeAttribute("style", wizard.getStyle(), "style");
        }

        if(wizard.isShowStepStatus()) {
            encodeStepStatus(facesContext, wizard);
        }

        encodeContent(facesContext, wizard);

        if(wizard.isShowNavBar()) {
            encodeNavigators(facesContext, wizard);
        }

        writer.endElement("div");
    }

    protected void encodeCurrentStep(FacesContext facesContext, Wizard wizard) throws IOException {
        for (UIComponent child : wizard.getChildren()) {
            if (child instanceof Tab && child.isRendered()) {
                Tab tab = (Tab) child;

                if ((wizard.getStep() == null || tab.getId().equals(wizard.getStep()))) {
                    tab.encodeAll(facesContext);

                    break;
                }
            }
        }
    }

    protected void encodeNavigators(FacesContext facesContext, Wizard wizard) throws IOException {
        ResponseWriter writer = facesContext.getResponseWriter();
        String clientId = wizard.getClientId(facesContext);
        String widgetVar = wizard.resolveWidgetVar();

        writer.startElement("div", null);
        writer.writeAttribute("class", "ui-wizard-navbar ui-helper-clearfix", null);

        encodeNavigator(facesContext, wizard, clientId + "_back", widgetVar + ".back()", wizard.getBackLabel(), "ui-wizard-nav-back");
        encodeNavigator(facesContext, wizard, clientId + "_next", widgetVar + ".next()", wizard.getNextLabel(), "ui-wizard-nav-next");

        writer.endElement("div");
    }

    protected void encodeContent(FacesContext facesContext, Wizard wizard) throws IOException {
        ResponseWriter writer = facesContext.getResponseWriter();
        String clientId = wizard.getClientId(facesContext);

        writer.startElement("div", null);
        writer.writeAttribute("id", clientId + "_content", "id");
        writer.writeAttribute("class", "ui-wizard-content", null);

        encodeCurrentStep(facesContext, wizard);

        writer.endElement("div");
    }

    protected void encodeStepStatus(FacesContext context, Wizard wizard) throws IOException {
        ResponseWriter writer = context.getResponseWriter();
        String currentStep = wizard.getStep();
        boolean currentFound = false;

        writer.startElement("ul", null);
        writer.writeAttribute("class", "ui-wizard-step-titles ui-helper-reset ui-helper-clearfix", null);

        for(UIComponent child : wizard.getChildren()) {
            if(child instanceof Tab && child.isRendered()) {
                Tab tab = (Tab) child;
                String styleClass = "ui-wizard-step-title ui-state-default";

                if((!currentFound) && (currentStep == null || tab.getId().equals(currentStep))) {
                    styleClass += " ui-state-hover";
                    currentFound = true;
                }

                styleClass += " ui-corner-all";

                writer.startElement("li", null);
                writer.writeAttribute("class", styleClass, null);
                writer.write(tab.getTitle());
                writer.endElement("li");
            }
        }

        writer.endElement("ul");
    }

    protected void encodeNavigator(FacesContext facesContext, Wizard wizard, String id, String onclick, String label, String styleClass) throws IOException {
        ResponseWriter writer = facesContext.getResponseWriter();

        writer.startElement("button", null);
        writer.writeAttribute("id", id, null);
        writer.writeAttribute("onclick", onclick, null);
        writer.writeAttribute("type", "button", null);
        writer.writeAttribute("class", styleClass, null);
        writer.write(label);
        writer.endElement("button");
    }

    @Override
    public void encodeChildren(FacesContext facesContext, UIComponent component) throws IOException {
        //Rendering happens on encodeEnd
    }

    @Override
    public boolean getRendersChildren() {
        return true;
    }
}