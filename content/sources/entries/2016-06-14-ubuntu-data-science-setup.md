---
type: post
title: "Ubuntu 16.04 alongside Windows for Data Science"
date: "2016-06-14"
summary: "Step-by-step guide to dual-booting Ubuntu 16.04 Xenial with Windows and installing R, RStudio, Python (Anaconda 2.7 + 3.5), Git, and Sublime Text 3."
tags: ["linux", "ubuntu", "python", "r", "data-science", "setup"]
---

Having a Windows laptop with good specs (8 GB RAM, 4 cores) felt limiting for scientific computing. Unix-based systems like Linux and macOS are more convenient for data work. Here are the exact steps that got me up and running with Ubuntu 16.04 Xenial alongside Windows 7.

## Table of contents

- [Dual Boot Setup](#dual-boot)
- [Install R](#install-r)
- [Install RStudio](#install-rstudio)
- [Install Git](#install-git)
- [Install Python (Anaconda)](#install-python)
- [Install Sublime Text 3](#install-sublime)

---

## Dual Boot Setup {#dual-boot}

### What you need

- [Ubuntu 16.04 ISO](http://www.ubuntu.com/download/desktop)
- [Rufus](https://rufus.akeo.ie/) — to create a bootable USB
- A USB drive with at least 8 GB

### Create bootable USB

Launch Rufus, select the ISO and USB drive, click Start.

### Partition the hard drive

Open `diskmgmt.msc` (Windows disk management). Right-click your largest partition → **Shrink Volume** → shrink by at least 20 GB. This frees space for Ubuntu.

### Install Ubuntu

Reboot, enter your BIOS boot menu, boot from USB. Choose **Try Ubuntu** first to confirm everything works, then **Install Ubuntu**. At the installation type screen, choose **Install alongside Windows**.

After installation:

```bash
sudo update-grub
```

On next boot you'll see a GRUB menu to choose between Ubuntu and Windows.

---

## Install R {#install-r}

```bash
sudo add-apt-repository ppa:marutter/rrutter
sudo apt-get update
sudo apt-get install r-base r-base-dev
```

---

## Install RStudio {#install-rstudio}

```bash
sudo apt-get install gdebi-core
wget https://download1.rstudio.org/rstudio-0.99.902-amd64.deb
sudo gdebi -n rstudio-0.99.902-amd64.deb
rm rstudio-0.99.902-amd64.deb
```

---

## Install Git {#install-git}

```bash
sudo apt-get install git
```

---

## Install Python (Anaconda 2.7 + 3.5 virtual env) {#install-python}

### Anaconda 2.7

```bash
wget https://repo.anaconda.com/archive/Anaconda2-5.3.1-Linux-x86_64.sh
bash Anaconda2-5.3.1-Linux-x86_64.sh
exec bash
```

### Python 3.5 virtual environment

```bash
conda create -n py35 python=3.5 anaconda
source activate py35
conda install jupyter
source deactivate
```

To start Jupyter: `jupyter notebook`

---

## Install Sublime Text 3 {#install-sublime}

```bash
sudo add-apt-repository ppa:webupd8team/sublime-text-3
sudo apt-get update
sudo apt-get install sublime-text-installer
```

---

## Conclusion

Ubuntu 16.04 Xenial is the most flexible choice for data science on a dual-boot laptop — you get R, RStudio, Python 2 + 3, Git, and Jupyter with a handful of commands. None of the purpose-built scientific Linux distros at the time had all of this pre-installed.

**Bonus:** install Jekyll for static site development:

```bash
sudo apt-get install jekyll
```
