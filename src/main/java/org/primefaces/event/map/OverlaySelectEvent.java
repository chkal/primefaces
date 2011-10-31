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
package org.primefaces.event.map;

import javax.faces.component.UIComponent;
import javax.faces.event.FacesEvent;
import javax.faces.event.FacesListener;

import org.primefaces.model.map.Overlay;

public class OverlaySelectEvent extends FacesEvent {

	private Overlay overlay;

	public OverlaySelectEvent(UIComponent component, Overlay overlay) {
		super(component);
		this.overlay = overlay;
	}

	@Override
	public boolean isAppropriateListener(FacesListener listener) {
		return false;
	}

	@Override
	public void processListener(FacesListener listener) {
		throw new UnsupportedOperationException();
	}

	public Overlay getOverlay() {
		return overlay;
	}
}