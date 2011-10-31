/*
 * Copyright 2009,2010 Prime Technology.
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
package org.primefaces.event;

import javax.faces.component.UIComponent;
import javax.faces.event.FacesEvent;
import javax.faces.event.FacesListener;

import org.primefaces.model.ScheduleEvent;

public class ScheduleEntryResizeEvent extends FacesEvent {

	private ScheduleEvent scheduleEvent;

	private int dayDelta;

	private int minuteDelta;

	public ScheduleEntryResizeEvent(UIComponent component, ScheduleEvent scheduleEvent, int dayDelta, int minuteDelta) {
		super(component);
		this.scheduleEvent = scheduleEvent;
		this.dayDelta = dayDelta;
		this.minuteDelta = minuteDelta;
	}

	@Override
	public boolean isAppropriateListener(FacesListener faceslistener) {
		return false;
	}

	@Override
	public void processListener(FacesListener faceslistener) {
		throw new UnsupportedOperationException();
	}

	public ScheduleEvent getScheduleEvent() {
		return scheduleEvent;
	}

	public int getDayDelta() {
		return dayDelta;
	}

	public int getMinuteDelta() {
		return minuteDelta;
	}
}