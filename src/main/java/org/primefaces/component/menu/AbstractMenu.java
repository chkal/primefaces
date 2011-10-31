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
package org.primefaces.component.menu;

import javax.faces.component.UIComponent;
import javax.faces.component.UIComponentBase;

import org.primefaces.model.MenuModel;

public abstract class AbstractMenu extends UIComponentBase {

	private final static String BUILT_FROM_MODEL_PARAM = "_builtFromModel";

	public void buildMenuFromModel() {
		MenuModel model = (MenuModel) getModel();

		if(model != null) {
			for(UIComponent kid : model.getSubmenus())
				getChildren().add(kid);

			for(UIComponent kid : model.getMenuItems())
				getChildren().add(kid);

			markAsBuiltFromModel();
		}
	}

	public abstract MenuModel getModel();

	public boolean isDynamic() {
		return this.getValueExpression("model") != null;
	}

	public boolean isBuiltFromModel() {
		return getFacesContext().getViewRoot().getViewMap().containsKey(this.getClientId() + BUILT_FROM_MODEL_PARAM);
	}

	public void markAsBuiltFromModel() {
		getFacesContext().getViewRoot().getViewMap().put(this.getClientId() + BUILT_FROM_MODEL_PARAM, true);
	}

	public boolean shouldBuildFromModel() {
		return this.isDynamic() && !isBuiltFromModel();
	}
}