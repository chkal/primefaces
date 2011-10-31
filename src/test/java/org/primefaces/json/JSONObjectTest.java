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
package org.primefaces.json;

import org.junit.Test;

import static org.junit.Assert.*;

public class JSONObjectTest {

	@Test
	public void testBooleanToJSON() {
		try {
			String json = new JSONObject().put("valid", true).toString();
			assertEquals("{\"valid\":true}", json);
		} catch (JSONException e) {
			fail();
		}
	}

	@Test
	public void testPojoToJSON() {
		String json = new JSONObject(new Person("Cagatay", "Civici")).toString();
		assertEquals("{\"lastname\":\"Civici\",\"firstname\":\"Cagatay\"}", json);
	}

	static public class Person {

		private String firstname;
		private String lastname;

		public Person() {}

		public Person(String firstname, String lastname) {
			this.firstname = firstname;
			this.lastname = lastname;
		}
		public String getFirstname() {
			return firstname;
		}
		public void setFirstname(String firstname) {
			this.firstname = firstname;
		}
		public String getLastname() {
			return lastname;
		}
		public void setLastname(String lastname) {
			this.lastname = lastname;
		}
	}
}
