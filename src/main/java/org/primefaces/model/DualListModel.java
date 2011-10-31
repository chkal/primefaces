package org.primefaces.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class DualListModel<T> implements Serializable {

	private List<T> source = new ArrayList<T>();
	private List<T> target = new ArrayList<T>();

	public DualListModel() {}

	public DualListModel(List<T> source, List<T> target) {
		this.source = source;
		this.target = target;
	}

	public List<T> getSource() {
		return source;
	}
	public void setSource(List<T> source) {
		this.source = source;
	}

	public List<T> getTarget() {
		return target;
	}
	public void setTarget(List<T> target) {
		this.target = target;
	}
}
